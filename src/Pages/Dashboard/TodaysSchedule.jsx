import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BookingCard from "./BookingCard";

const TodaysSchedule = () => {
  const axiosSecure = useAxiosSecure();
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["todaySchedule"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator/today-schedule");
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10 animate-pulse">Loading...</p>;

  if (bookings.length === 0)
    return <p className="text-center mt-10">No work scheduled today</p>;

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold text-center mb-6">Today's Schedule</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <BookingCard key={b._id} booking={b} />
        ))}
      </div>
    </div>
  );
};

export default TodaysSchedule;
