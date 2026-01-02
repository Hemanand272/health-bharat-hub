import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon, Stethoscope, Video, Phone, MapPin, Clock, Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ghibliDoctor1 from "@/assets/ghibli-doctor-1.jpg";
import ghibliDoctor2 from "@/assets/ghibli-doctor-2.jpg";
import ghibliDoctor3 from "@/assets/ghibli-doctor-3.jpg";
import ghibliDoctor4 from "@/assets/ghibli-doctor-4.jpg";
import ghibliDoctor5 from "@/assets/ghibli-doctor-5.jpg";
import ghibliDoctor6 from "@/assets/ghibli-doctor-6.jpg";
import ghibliDoctor7 from "@/assets/ghibli-doctor-7.jpg";
import ghibliDoctor8 from "@/assets/ghibli-doctor-8.jpg";

const doctors = [
  { id: 1, name: "Dr. Arun Sharma", specialty: "General Physician", experience: "15 years", rating: 4.9, fee: 500, available: ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"], image: ghibliDoctor1 },
  { id: 2, name: "Dr. Priya Patel", specialty: "Nutritionist", experience: "12 years", rating: 4.8, fee: 600, available: ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"], image: ghibliDoctor2 },
  { id: 3, name: "Dr. Rajesh Kumar", specialty: "Ayurveda Specialist", experience: "20 years", rating: 4.9, fee: 700, available: ["10:00 AM", "12:00 PM", "2:00 PM", "6:00 PM"], image: ghibliDoctor3 },
  { id: 4, name: "Dr. Meera Singh", specialty: "Dietitian", experience: "10 years", rating: 4.7, fee: 450, available: ["9:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"], image: ghibliDoctor4 },
  { id: 5, name: "Dr. Vikram Joshi", specialty: "Cardiologist", experience: "18 years", rating: 4.9, fee: 1000, available: ["11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"], image: ghibliDoctor5 },
  { id: 6, name: "Dr. Sunita Rao", specialty: "Ayurveda Healer", experience: "14 years", rating: 4.8, fee: 800, available: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"], image: ghibliDoctor6 },
  { id: 7, name: "Dr. Amit Verma", specialty: "Gastroenterologist", experience: "16 years", rating: 4.8, fee: 900, available: ["9:00 AM", "12:00 PM", "3:00 PM"], image: ghibliDoctor7 },
  { id: 8, name: "Dr. Kavita Sharma", specialty: "Pediatrician", experience: "11 years", rating: 4.9, fee: 550, available: ["10:00 AM", "2:00 PM", "4:00 PM"], image: ghibliDoctor8 },
];

const specialties = ["All", "General Physician", "Nutritionist", "Ayurveda Specialist", "Dietitian", "Cardiologist", "Gastroenterologist", "Pediatrician", "Ayurveda Healer"];

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

  const filteredDoctors = selectedSpecialty === "All" ? doctors : doctors.filter(d => d.specialty === selectedSpecialty);

  const handleBookAppointment = () => {
    if (!selectedDoctor || !date || !selectedTime || !patientName || !patientPhone) {
      toast({ title: "Missing Information", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setBookingComplete(true);
    toast({ title: "Appointment Booked!", description: `Your appointment with ${selectedDoctor.name} is confirmed for ${format(date, "PPP")} at ${selectedTime}` });
  };

  const resetBooking = () => {
    setSelectedDoctor(null); setDate(undefined); setSelectedTime(""); setPatientName(""); setPatientPhone(""); setSymptoms(""); setBookingComplete(false);
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
                <p><strong>Date:</strong> {format(date, "PPP")}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Fee:</strong> ₹{selectedDoctor.fee}</p>
              </div>
              <Button onClick={resetBooking} variant="hero" size="lg">Book Another Appointment</Button>
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
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">Consult from Home</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Book a <span className="text-gradient">Doctor Consultation</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Connect with verified doctors via video call, phone, or visit their clinic.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {specialties.map((specialty) => (
                <Button key={specialty} variant={selectedSpecialty === specialty ? "default" : "outline"} size="sm" onClick={() => setSelectedSpecialty(specialty)}>
                  {specialty}
                </Button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className={cn("cursor-pointer transition-all duration-300 hover:shadow-lg", selectedDoctor?.id === doctor.id && "ring-2 ring-primary")} onClick={() => setSelectedDoctor(doctor)}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-primary">{doctor.specialty}</p>
                        <p className="text-xs text-muted-foreground">{doctor.experience} experience</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{doctor.rating}</span>
                          <span className="text-sm font-semibold text-primary">₹{doctor.fee}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Stethoscope className="w-5 h-5 text-primary" />Book Appointment</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {selectedDoctor ? (
                  <>
                    <div className="p-3 bg-primary/10 rounded-lg"><p className="font-semibold">{selectedDoctor.name}</p><p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p></div>
                    <div className="flex gap-2">
                      <Button variant={consultationType === "video" ? "default" : "outline"} size="sm" onClick={() => setConsultationType("video")} className="flex-1"><Video className="w-4 h-4 mr-1" /> Video</Button>
                      <Button variant={consultationType === "phone" ? "default" : "outline"} size="sm" onClick={() => setConsultationType("phone")} className="flex-1"><Phone className="w-4 h-4 mr-1" /> Phone</Button>
                      <Button variant={consultationType === "clinic" ? "default" : "outline"} size="sm" onClick={() => setConsultationType("clinic")} className="flex-1"><MapPin className="w-4 h-4 mr-1" /> Clinic</Button>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left"><CalendarIcon className="mr-2 h-4 w-4" />{date ? format(date, "PPP") : "Pick a date"}</Button></PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-background border border-border z-50"><Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} initialFocus /></PopoverContent>
                    </Popover>
                    {date && <div className="grid grid-cols-2 gap-2">{selectedDoctor.available.map((time) => (<Button key={time} variant={selectedTime === time ? "default" : "outline"} size="sm" onClick={() => setSelectedTime(time)}><Clock className="w-3 h-3 mr-1" /> {time}</Button>))}</div>}
                    <Input placeholder="Your Full Name *" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                    <Input placeholder="Phone Number *" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} />
                    <Textarea placeholder="Describe your symptoms (optional)" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={3} />
                    <div className="flex justify-between items-center pt-2 border-t"><span className="text-muted-foreground">Fee:</span><span className="text-xl font-bold text-primary">₹{selectedDoctor.fee}</span></div>
                    <Button onClick={handleBookAppointment} variant="hero" className="w-full" size="lg">Book Appointment</Button>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground"><Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-50" /><p>Select a doctor to book an appointment</p></div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
