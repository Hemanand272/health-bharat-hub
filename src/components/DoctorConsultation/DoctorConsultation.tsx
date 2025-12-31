import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon, Stethoscope, Video, Phone, MapPin, Clock, Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const doctors = [
  { id: 1, name: "Dr. Arun Sharma", specialty: "General Physician", experience: "15 years", rating: 4.9, fee: 500, available: ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"], image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop" },
  { id: 2, name: "Dr. Priya Patel", specialty: "Nutritionist", experience: "12 years", rating: 4.8, fee: 600, available: ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"], image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop" },
  { id: 3, name: "Dr. Rajesh Kumar", specialty: "Ayurveda Specialist", experience: "20 years", rating: 4.9, fee: 700, available: ["10:00 AM", "12:00 PM", "2:00 PM", "6:00 PM"], image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop" },
  { id: 4, name: "Dr. Meera Singh", specialty: "Dietitian", experience: "10 years", rating: 4.7, fee: 450, available: ["9:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"], image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop" },
  { id: 5, name: "Dr. Vikram Joshi", specialty: "Cardiologist", experience: "18 years", rating: 4.9, fee: 1000, available: ["11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"], image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop" },
  { id: 6, name: "Dr. Sunita Rao", specialty: "Gastroenterologist", experience: "14 years", rating: 4.8, fee: 800, available: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"], image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150&h=150&fit=crop" },
];

const specialties = ["All", "General Physician", "Nutritionist", "Ayurveda Specialist", "Dietitian", "Cardiologist", "Gastroenterologist"];

export const DoctorConsultation = () => {
  const { toast } = useToast();
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [consultationType, setConsultationType] = useState("video");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [bookingComplete, setBookingComplete] = useState(false);

  const filteredDoctors = selectedSpecialty === "All" 
    ? doctors 
    : doctors.filter(d => d.specialty === selectedSpecialty);

  const handleBookAppointment = () => {
    if (!selectedDoctor || !date || !selectedTime || !patientName || !patientPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setBookingComplete(true);
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${selectedDoctor.name} is confirmed for ${format(date, "PPP")} at ${selectedTime}`,
    });
  };

  const resetBooking = () => {
    setSelectedDoctor(null);
    setDate(undefined);
    setSelectedTime("");
    setPatientName("");
    setPatientPhone("");
    setSymptoms("");
    setBookingComplete(false);
  };

  if (bookingComplete && selectedDoctor && date) {
    return (
      <section id="consultation" className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center p-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Appointment Confirmed!</h2>
              <div className="space-y-3 text-muted-foreground mb-8">
                <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
                <p><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
                <p><strong>Date:</strong> {format(date, "PPP")}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Type:</strong> {consultationType === "video" ? "Video Call" : consultationType === "phone" ? "Phone Call" : "In-Person"}</p>
                <p><strong>Fee:</strong> ₹{selectedDoctor.fee}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                A confirmation SMS and email will be sent to your registered contact details.
              </p>
              <Button onClick={resetBooking} variant="hero" size="lg">
                Book Another Appointment
              </Button>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="consultation" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            Consult from Home
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Book a <span className="text-gradient">Doctor Consultation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Connect with verified doctors via video call, phone, or visit their clinic. Get expert medical advice from the comfort of your home.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Doctor Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant={selectedSpecialty === specialty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSpecialty(specialty)}
                >
                  {specialty}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredDoctors.map((doctor) => (
                <Card 
                  key={doctor.id} 
                  className={cn(
                    "cursor-pointer transition-all duration-300 hover:shadow-lg",
                    selectedDoctor?.id === doctor.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-primary">{doctor.specialty}</p>
                        <p className="text-xs text-muted-foreground">{doctor.experience} experience</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{doctor.rating}</span>
                          </div>
                          <span className="text-sm font-semibold text-primary">₹{doctor.fee}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-primary" />
                  Book Appointment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDoctor ? (
                  <>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="font-semibold">{selectedDoctor.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Consultation Type</label>
                      <div className="flex gap-2">
                        <Button
                          variant={consultationType === "video" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setConsultationType("video")}
                          className="flex-1"
                        >
                          <Video className="w-4 h-4 mr-1" /> Video
                        </Button>
                        <Button
                          variant={consultationType === "phone" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setConsultationType("phone")}
                          className="flex-1"
                        >
                          <Phone className="w-4 h-4 mr-1" /> Phone
                        </Button>
                        <Button
                          variant={consultationType === "clinic" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setConsultationType("clinic")}
                          className="flex-1"
                        >
                          <MapPin className="w-4 h-4 mr-1" /> Clinic
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-background border border-border z-50">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {date && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Select Time</label>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedDoctor.available.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                            >
                              <Clock className="w-3 h-3 mr-1" /> {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Input
                      placeholder="Your Full Name *"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />

                    <Input
                      placeholder="Phone Number *"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                    />

                    <Textarea
                      placeholder="Describe your symptoms (optional)"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      rows={3}
                    />

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-muted-foreground">Consultation Fee:</span>
                      <span className="text-xl font-bold text-primary">₹{selectedDoctor.fee}</span>
                    </div>

                    <Button onClick={handleBookAppointment} variant="hero" className="w-full" size="lg">
                      Book Appointment
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a doctor to book an appointment</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
