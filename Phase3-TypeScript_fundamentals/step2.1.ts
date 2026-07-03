type Category = "food" | "transport" | "study" | "entertainment" | "other";

interface ExpenseItem1 {
    id: number;
    title: string;
    amount: number;
    category: Category;
    note?: string; // Optional property
}

const ok: ExpenseItem1 = {
    id: 1,
    title: "Movie",
    amount: 15,
    category: "entertainment"
}

type Filter = Category | "all";

function filterExpenses(expenses: ExpenseItem1[], filter: Filter): ExpenseItem1[] {
    if (filter === "all") {
        return expenses;
    }
    return expenses.filter((e) => e.category === filter);
}

function formatExpense(e: ExpenseItem1): string {
    return `${e.title} = $${e.amount} (${e.category})`;
}

const a: ExpenseItem1 = {
    id: 2,
    title: "Lunch",
    amount: 12,
    category: "food"
};

const b: ExpenseItem1 = {
    id: 3,
    title: "Book",
    amount: 30,
    category: "study",
    note: "TS handbook"
};

function calculateTotal(expenses: ExpenseItem1[]): number {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

function getNotePreview(e: ExpenseItem1): string {
    return e.note ? e.note : ""
}