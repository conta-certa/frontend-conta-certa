import { Calendar as AntCalendar, Badge, Card } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { transactionApi } from "../../services/transactionApi";
import TransactionLog from "./components/transactionLog/TransactionLog";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openLog, setOpenLog] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const res = await transactionApi.getAll();
      setTransactions(res.data);
    } catch (error) {
      console.error("Erro ao buscar transações", error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const onSelect = (date) => {
    setSelectedDate(date);
    setOpenLog(true);
  };

  const cellRender = ({ current, type }) => {
    if (type === "date") {
      const dateStr = current.format("YYYY-MM-DD");

      const hasIncome = transactions.some(
        (t) =>
          dayjs(t.date).format("YYYY-MM-DD") === dateStr &&
          t.type === "INCOME"
      );
      const hasExpense = transactions.some(
        (t) =>
          dayjs(t.date).format("YYYY-MM-DD") === dateStr &&
          t.type === "EXPENSE"
      );

      return (
        <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
          {hasIncome && <Badge color="green" />}
          {hasExpense && <Badge color="red" />}
        </div>
      );
    }
    return null;
  };

  return (
    <>
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
          onSelect={onSelect}
          cellRender={cellRender}
        />
      </Card>

      <TransactionLog
        open={openLog}
        onClose={() => setOpenLog(false)}
        date={selectedDate}
      />
    </>
  );
};

export default CalendarPage;
