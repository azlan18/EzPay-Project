export const TransactionCard = ({ transaction }) => {
    const { from, to, amount, date } = transaction;
    const userId = localStorage.getItem("userId"); // Fetch logged-in user's ID

    const isOutgoing = from === userId; // Determine if the transaction is outgoing
    const transactionDate = new Date(date).toLocaleDateString();

    return (
        <div className="border p-4 rounded shadow-lg bg-white">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold">
                        {isOutgoing ? `Sent to: ${to}` : `Received from: ${from}`}
                    </h3>
                    <p className="text-sm text-gray-500">Date: {transactionDate}</p>
                </div>
                <div className={`font-semibold ${isOutgoing ? 'text-red-600' : 'text-green-600'}`}>
                    {isOutgoing ? `-₹${amount}` : `+₹${amount}`}
                </div>
            </div>
        </div>
    );
};
