import useOrderStore from "../storage/use-order-store";

const BadgeAlertOrders = () => {
    const ordersCount = useOrderStore((state) => state.ordersCount);
    const hasNewOrders = useOrderStore((state) => state.hasNewOrders);
    const markOrdersAsSeen = useOrderStore((state) => state.markOrdersAsSeen);

    if (!hasNewOrders || ordersCount === 0) return null;

    return (
        <span
        className="h-5 w-5 inline-flex justify-center items-center text-white rounded-full bg-primary text-[0.7rem]"
        >
        {ordersCount}
        </span>
    );
}
 
export default BadgeAlertOrders;