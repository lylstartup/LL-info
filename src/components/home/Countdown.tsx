import { useState, useEffect } from "react";

interface TimeUnit {
  value: number;
  label: string;
}

const Countdown = () => {
  const targetDate = new Date("2028-01-12T00:00:00").getTime();

  const calculateTimeLeft = (): TimeUnit[] => {
  const now = new Date();
  const target = new Date("2028-01-12T00:00:00");

  if (now >= target) {
    return [
      { value: 0, label: "Años" },
      { value: 0, label: "Meses" },
      { value: 0, label: "Días" },
      { value: 0, label: "Horas" },
    ];
  }

  let years = target.getFullYear() - now.getFullYear();
  let months = target.getMonth() - now.getMonth();
  let days = target.getDate() - now.getDate();
  let hours = target.getHours() - now.getHours();

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    const previousMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += previousMonth.getDate();
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  return [
    { value: years, label: "Años" },
    { value: months, label: "Meses" },
    { value: days, label: "Días" },
    { value: hours, label: "Horas" },
  ];
};


  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {timeLeft.map((unit, index) => (
        <div
          key={unit.label}
          className="glass rounded-2xl p-6 md:p-8 min-w-[100px] md:min-w-[140px] text-center border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
            {String(unit.value).padStart(2, "0")}
          </div>
          <div className="text-muted-foreground text-sm md:text-base font-medium uppercase tracking-wider">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
