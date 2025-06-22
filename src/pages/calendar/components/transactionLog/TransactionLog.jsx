import { Timeline, Typography, Tag, Empty } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import "./style.css";
import { transactionApi } from "../../../../services/transactionApi";

const { Text, Title } = Typography;

const TransactionLog = ({ open, onClose, date }) => {
  const [transactions, setTransactions] = useState([]);
  const sheetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(open);

  const getTransactions = async () => {
    try {
      const startDate = dayjs(date).startOf("day").toISOString();
      const endDate = dayjs(date).endOf("day").toISOString();

      const response = await transactionApi.getByDateRange(
        startDate,
        endDate
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações", error);
    }
  };

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      getTransactions();
    } else {
      setTimeout(() => setIsVisible(false), 300); // tempo da animação
    }
  }, [open, date]);

  const handleDrag = (e) => {
    const startY = e.clientY || e.touches[0].clientY;
    const startHeight = sheetRef.current.getBoundingClientRect().height;

    const onMove = (moveEvent) => {
      const currentY = moveEvent.clientY || moveEvent.touches[0].clientY;
      const deltaY = startY - currentY;
      let newHeight = startHeight + deltaY;

      const minHeight = window.innerHeight / 3;
      const maxHeight = (window.innerHeight * 2) / 3;

      newHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));
      sheetRef.current.style.height = `${newHeight}px`;
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`transaction-log-overlay ${
        open ? "open" : "closing"
      }`}
      onClick={onClose}
    >
      <div
        className="transaction-log-sheet"
        ref={sheetRef}
        style={{ height: "33vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="drag-handle"
          onMouseDown={handleDrag}
          onTouchStart={handleDrag}
        >
          <div className="drag-bar" />
        </div>

        <Title level={5} style={{ marginLeft: 12 }}>
          Transações de {dayjs(date).format("DD/MM/YYYY")}
        </Title>
        

        {transactions.length === 0 ? (
          <Empty description="Nenhuma transação" />
        ) : (
          <Timeline style={{ padding: "16px", overflowY: "auto" }}>
            {transactions.map((item) => (
              <Timeline.Item key={item.id}>
                <Title level={5} style={{ margin: 0 }}>
                  {item.category.name} -{" "}
                  <Tag color={item.type === "INCOME" ? "green" : "red"}>
                    {item.type === "INCOME" ? "Entrada" : "Saída"}
                  </Tag>
                </Title>
                <Text>{item.description}</Text>
                <br />
                <Text strong>
                  Valor: R$ {Number(item.amount).toFixed(2)}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </div>
    </div>
  );
};

export default TransactionLog;
