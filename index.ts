type Pizza = {
    id: number,
    name: string,
    price: number
};

type Order = {
    id: number,
    pizza: Pizza,
    status: "ordered" | "completed"
};

let nextOrderId = 1;
let nextPizzaId = 1;
let cashInRegister = 100;
const orderQueue: Order[] = [];

const menu: Pizza[] = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggie", price: 9 }
];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
    const newPizza = {
        id: nextPizzaId,
        ...pizzaObj
    };
    menu.push(newPizza);
    return newPizza;
}

function placeOrder(pizzaName: string): Order | undefined {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName);
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`);
        return;
    }
    cashInRegister += selectedPizza.price;
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered"};
    orderQueue.push(newOrder);
    return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
    const order = orderQueue.find(order => order.id === orderId);
    if (!order) {
        console.error(`${orderId} does not exist in the menu`);
        return;
    }
    order.status = "completed";
    
    return order;
}

function getPizzaDetail(identifier: number | string): Pizza | undefined {
    if (typeof identifier === 'string') {
        return menu.find(pizzaObj => pizzaObj.name.toLowerCase() === identifier.toLowerCase());
    }
    else if (typeof identifier === "number") {
        return menu.find(pizzaObj => pizzaObj.id === identifier);
    } else {
        throw new TypeError("Parameter `identifier` must be either a string or a number");
    }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });

placeOrder("Chicken Bacon Ranch");
completeOrder(1);

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", menu);
