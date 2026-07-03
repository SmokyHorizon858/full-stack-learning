type ExpenseCategoryV3 = "food" | "transport" | "study" | "entertainment" | "other";
type ExpenseFilterV3 = ExpenseCategoryV3 | "all";

interface ExpenseItemV3 {
    id: number;
    title: string;
    amount: number;
    category: ExpenseCategoryV3;
    note?: string; // Optional property
}

const expenses: ExpenseItemV3[] = [
  { id: 1, title: "Lunch", amount: 12, category: "food" },
  { id: 2, title: "Bus", amount: 4, category: "transport" },
  { id: 3, title: "Notebook", amount: 9, category: "study" },
  { id: 4, title: "Movie", amount: 18, category: "entertainment" },
  { id: 5, title: "Dinner", amount: 20, category: "food" },
];

// Function to calculate the total amount of expenses
function getTotalExpenses(items: ExpenseItemV3[]): number {
    return items.reduce((sum, item) => sum + item.amount, 0);
}

// Filter by category
function filterExpenses1(items: ExpenseItemV3[], filter: ExpenseFilterV3): ExpenseItemV3[] {
    if (filter === "all") {
        return items;
    }
    return items.filter(item => item.category === filter);
}

// Highest spending category (object accumulator pattern)
function getHighestSpendingCategory(items: ExpenseItemV3[]): ExpenseCategoryV3 | null {
    if (items.length === 0) return null;

    const totals: Record<ExpenseCategoryV3, number> = {
        food: 0,
        transport: 0,
        study: 0,
        entertainment: 0,
        other: 0,
    };

    for (const item of items) {
        totals[item.category] += item.amount;
    }

    let topCategory: ExpenseCategoryV3 = "food";
    let max = totals[topCategory];

    for (const category of Object.keys(totals) as ExpenseCategoryV3[]) {
        if (totals[category] > max) {
            max = totals[category];
            topCategory = category;
        }

    }
    return topCategory;
}


console.log("Total Expenses:", getTotalExpenses(expenses));
console.log("Highest Spending Category:", getHighestSpendingCategory(expenses));