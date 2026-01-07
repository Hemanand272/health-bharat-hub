import { useState, useMemo } from 'react';
import { Calculator, Target, Flame, TrendingDown, Plus, Trash2, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface MealEntry {
  id: string;
  name: string;
  calories: number;
  time: string;
}

const CalorieTracker = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'>('moderate');
  const [goalType, setGoalType] = useState<'lose' | 'maintain' | 'gain'>('lose');
  const [showResults, setShowResults] = useState(false);
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [newMealName, setNewMealName] = useState('');
  const [newMealCalories, setNewMealCalories] = useState('');

  const activityMultipliers = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9,
  };

  const goalAdjustments = {
    'lose': -500,
    'maintain': 0,
    'gain': 300,
  };

  const calculations = useMemo(() => {
    if (!weight || !height || !age) return null;

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (isNaN(w) || isNaN(h) || isNaN(a)) return null;

    // BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdee = bmr * activityMultipliers[activityLevel];
    const targetCalories = tdee + goalAdjustments[goalType];

    // BMI
    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);

    // Weeks to reach goal (assuming 0.5kg per week for weight loss)
    let weeksToGoal = 0;
    let idealWeight = 0;
    if (bmi > 24.9) {
      idealWeight = 24.9 * (heightInMeters * heightInMeters);
      const weightToLose = w - idealWeight;
      weeksToGoal = Math.ceil(weightToLose / 0.5);
    } else if (bmi < 18.5) {
      idealWeight = 18.5 * (heightInMeters * heightInMeters);
      const weightToGain = idealWeight - w;
      weeksToGoal = Math.ceil(weightToGain / 0.3);
    } else {
      idealWeight = w;
    }

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      bmi: bmi.toFixed(1),
      idealWeight: Math.round(idealWeight),
      weeksToGoal,
    };
  }, [weight, height, age, gender, activityLevel, goalType]);

  const todayCalories = useMemo(() => {
    return meals.reduce((sum, meal) => sum + meal.calories, 0);
  }, [meals]);

  const calorieProgress = useMemo(() => {
    if (!calculations) return 0;
    return Math.min((todayCalories / calculations.targetCalories) * 100, 100);
  }, [todayCalories, calculations]);

  const addMeal = () => {
    if (!newMealName || !newMealCalories) return;
    const calories = parseInt(newMealCalories);
    if (isNaN(calories)) return;

    setMeals(prev => [...prev, {
      id: Date.now().toString(),
      name: newMealName,
      calories,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }]);
    setNewMealName('');
    setNewMealCalories('');
  };

  const removeMeal = (id: string) => {
    setMeals(prev => prev.filter(m => m.id !== id));
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-yellow-500' };
    if (bmi < 24.9) return { label: 'Normal', color: 'text-green-500' };
    if (bmi < 29.9) return { label: 'Overweight', color: 'text-orange-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  return (
    <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-accent" />
          Weight Loss & Calorie Tracker
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calculate your daily calorie needs and track your intake for effective weight management
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!showResults ? (
          <>
            {/* Personal Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="30"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={gender} onValueChange={(v: 'male' | 'female') => setGender(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Activity Level */}
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={(v: any) => setActivityLevel(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Very Active (hard exercise daily)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Goal */}
            <div className="space-y-2">
              <Label>Your Goal</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={goalType === 'lose' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setGoalType('lose')}
                  className="flex-col h-auto py-3"
                >
                  <TrendingDown className="h-4 w-4 mb-1" />
                  <span className="text-xs">Lose Weight</span>
                </Button>
                <Button
                  variant={goalType === 'maintain' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setGoalType('maintain')}
                  className="flex-col h-auto py-3"
                >
                  <Scale className="h-4 w-4 mb-1" />
                  <span className="text-xs">Maintain</span>
                </Button>
                <Button
                  variant={goalType === 'gain' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setGoalType('gain')}
                  className="flex-col h-auto py-3"
                >
                  <Target className="h-4 w-4 mb-1" />
                  <span className="text-xs">Gain Muscle</span>
                </Button>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={() => setShowResults(true)}
              disabled={!weight || !height || !age}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate My Plan
            </Button>
          </>
        ) : (
          <>
            {calculations && (
              <>
                {/* Results */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <Flame className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-primary">{calculations.targetCalories}</p>
                    <p className="text-xs text-muted-foreground">Daily Calorie Target</p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg text-center">
                    <Scale className="h-6 w-6 mx-auto mb-2 text-accent" />
                    <p className={`text-2xl font-bold ${getBMICategory(parseFloat(calculations.bmi)).color}`}>
                      {calculations.bmi}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      BMI ({getBMICategory(parseFloat(calculations.bmi)).label})
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">BMR (Basal Metabolic Rate)</span>
                    <span className="font-medium">{calculations.bmr} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TDEE (Daily Energy Expenditure)</span>
                    <span className="font-medium">{calculations.tdee} kcal</span>
                  </div>
                  {calculations.weeksToGoal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Estimated weeks to ideal weight ({calculations.idealWeight}kg)
                      </span>
                      <span className="font-medium">{calculations.weeksToGoal} weeks</span>
                    </div>
                  )}
                </div>

                {/* Today's Tracker */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    Today's Calorie Intake
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{todayCalories} / {calculations.targetCalories} kcal</span>
                      <span className={todayCalories > calculations.targetCalories ? 'text-red-500' : 'text-green-500'}>
                        {calculations.targetCalories - todayCalories > 0 
                          ? `${calculations.targetCalories - todayCalories} remaining`
                          : `${todayCalories - calculations.targetCalories} over`
                        }
                      </span>
                    </div>
                    <Progress value={calorieProgress} className="h-3" />
                  </div>

                  {/* Add Meal */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Meal name"
                      value={newMealName}
                      onChange={(e) => setNewMealName(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Calories"
                      value={newMealCalories}
                      onChange={(e) => setNewMealCalories(e.target.value)}
                      className="w-24"
                    />
                    <Button size="icon" onClick={addMeal}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Meal List */}
                  {meals.length > 0 && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {meals.map(meal => (
                        <div 
                          key={meal.id}
                          className="flex items-center justify-between p-2 bg-card rounded-lg border border-border"
                        >
                          <div>
                            <p className="text-sm font-medium">{meal.name}</p>
                            <p className="text-xs text-muted-foreground">{meal.time}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{meal.calories} kcal</span>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-6 w-6 text-muted-foreground hover:text-destructive"
                              onClick={() => removeMeal(meal.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowResults(false)}
                >
                  Recalculate
                </Button>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CalorieTracker;
