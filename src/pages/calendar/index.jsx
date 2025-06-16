import { Calendar as AntCalendar, Card } from "antd";

const CalendarPage = () => {
  return (
    <Card
      className="max-w-4xl mx-auto"
      style={{
        marginBottom: "20px",
        height: "auto",
        overflow: "hidden",
      }}
    >
      <AntCalendar
        fullscreen={false}
        style={{ padding: "8px" }}
      />
    </Card>
  );
};

export default CalendarPage;
