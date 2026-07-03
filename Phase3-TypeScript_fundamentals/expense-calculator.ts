// expense-calculator.ts
export {}; // keeps this file in module scope (avoids global name collisions)

type ExpenseCategory = "food" | "transport" | "study" | "entertainment" | "other";
type ExpenseFilter = ExpenseCategory | "all";

interface ExpenseItem {
  id: number;
  title: string;
  amount: number;
  category: ExpenseCategory;
  note?: string; // optional property
}

interface ExpenseCalculatorState {
  expenses: ExpenseItem[];
  nextId: number;
}

// Generic helper: reusable for any array type
function getFirstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}

function createExpenseCalculator(initialExpenses: ExpenseItem[] = []): {
  addExpense: (title: string, amount: number, category: ExpenseCategory, note?: string) => ExpenseItem;
  getAllExpenses: () => ExpenseItem[];
  getTotalExpense: () => number;
  filterByCategory: (filter: ExpenseFilter) => ExpenseItem[];
  getHighestSpendingCategory: () => ExpenseCategory | null;
  formatExpense: (expense: ExpenseItem) => string;
  getNotePreview: (expense: ExpenseItem) => string;
} {
  const state: ExpenseCalculatorState = {
    expenses: [...initialExpenses],
    nextId: initialExpenses.length > 0 ? Math.max(...initialExpenses.map((e) => e.id)) + 1 : 1,
  };

  function addExpense(
    title: string,
    amount: number,
    category: ExpenseCategory,
    note?: string
  ): ExpenseItem {
    if (amount < 0) {
      throw new Error("Amount cannot be negative.");
    }

    const expense: ExpenseItem = {
      id: state.nextId++,
      title: title,
      amount: amount,
      category: category,
      note: note,
    };

    state.expenses.push(expense);
    return expense;
  }

  function getAllExpenses(): ExpenseItem[] {
    return state.expenses;
  }

  function getTotalExpense(): number {
    return state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function filterByCategory(filter: ExpenseFilter): ExpenseItem[] {
    if (filter === "all") return state.expenses;
    return state.expenses.filter((expense) => expense.category === filter);
  }

  function getHighestSpendingCategory(): ExpenseCategory | null {
    if (state.expenses.length === 0) return null;

    const totals: Record<ExpenseCategory, number> = {
      food: 0,
      transport: 0,
      study: 0,
      entertainment: 0,
      other: 0,
    };

    for (const expense of state.expenses) {
      totals[expense.category] += expense.amount;
    }

    let topCategory: ExpenseCategory = "food";
    let maxTotal: number = totals[topCategory];

    for (const category of Object.keys(totals) as ExpenseCategory[]) {
      if (totals[category] > maxTotal) {
        maxTotal = totals[category];
        topCategory = category;
      }
    }

    return topCategory;
  }

  function formatExpense(expense: ExpenseItem): string {
    return `${expense.title} - $${expense.amount.toFixed(2)} (${expense.category})`;
  }

  function getNotePreview(expense: ExpenseItem): string {
    return expense.note ? expense.note : "No note";
  }

  return {
    addExpense,
    getAllExpenses,
    getTotalExpense,
    filterByCategory,
    getHighestSpendingCategory,
    formatExpense,
    getNotePreview,
  };
}

// ----------------------
// Example usage / testing
// ----------------------
const calculator = createExpenseCalculator();

calculator.addExpense("Lunch", 12, "food");
calculator.addExpense("Bus", 4, "transport", "Used student card");
calculator.addExpense("Notebook", 9, "study");
calculator.addExpense("Movie", 18, "entertainment");
calculator.addExpense("Dinner", 20, "food");

const allExpenses: ExpenseItem[] = calculator.getAllExpenses();
const total: number = calculator.getTotalExpense();
const foodOnly: ExpenseItem[] = calculator.filterByCategory("food");
const topCategory: ExpenseCategory | null = calculator.getHighestSpendingCategory();
const firstExpense: ExpenseItem | undefined = getFirstItem(allExpenses);

console.log("All expenses:", allExpenses);
console.log("Total expense:", total);
console.log("Food expenses:", foodOnly);
console.log("Highest spending category:", topCategory);
console.log("First expense:", firstExpense ? calculator.formatExpense(firstExpense) : "None");