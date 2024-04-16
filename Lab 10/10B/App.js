import { useState } from "react";

function FilterableProductTable({ products }) {
    const [filterText, setFilterText] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div>
            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly}
            />
            <ProductTable
                products={products}
                filterText={filterText}
                inStockOnly={inStockOnly}
            />
        </div>
    );
}

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan="2">{category}</th>
        </tr>
    );
}

function ProductRow({ product }) {
    const name = product.new ? (
        product.name
    ) : (
        <span style={{ color: "brown" }}>{product.name}</span>
    );

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}

function ProductTable({ products, filterText, inStockOnly }) {
    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return;
        }
        if (inStockOnly && !product.new) {
            return;
        }
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category}
                />
            );
        }
        rows.push(<ProductRow product={product} key={product.name} />);
        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function SearchBar({
                       filterText,
                       inStockOnly,
                       onFilterTextChange,
                       onInStockOnlyChange,
                   }) {
    return (
        <form>
            <input
                type="text"
                value={filterText}
                placeholder="Search..."
                onChange={(e) => onFilterTextChange(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onInStockOnlyChange(e.target.checked)}
                />{" "}
                Only show products in stock
            </label>
        </form>
    );
}

const PRODUCTS = [
    { category: "Cars", price: "$30k", new: true, name: "Honda Civic" },
    { category: "Cars", price: "$80k", new: true, name: "Tesla Model X" },
    { category: "Cars", price: "$350k", new: false, name: "Rolls Royce Ghost" },
    { category: "Trucks", price: "$25k", new: true, name: "Ford Maverick" },
    { category: "Trucks", price: "$40k", new: false, name: "Ford Ranger" },
];

export default function App() {
    return <FilterableProductTable products={PRODUCTS} />;
}
