import React, { useEffect, useState } from "react";
import MiniProductCard from "./MiniProductCard";

function Search() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [brand, setBrand] = useState("");

    useEffect(() => {
        // Example: load all JSONs from S3
        const fileCount = 2
        const bucketUrl = "https://deals2get-products.s3.ap-south-1.amazonaws.com/amazon";

        async function loadAll() {
            const results = [];
            for (let i = 1; i <= fileCount; i++) {
                try {
                    const res = await fetch(`${bucketUrl}/item${i}.json`);
                    if (res.ok) {
                        results.push(await res.json());
                    }
                } catch (err) {
                    console.error("Error loading", i, err);
                }
            }
            setData(results);
            setLoading(false);
        }
        loadAll();
    }, []);

    // Filtering logic
    const filtered = data.filter((item) => {
        const title = item.productDetails?.title?.toLowerCase() || "";
        const subtitle = item.productDetails?.subtitle?.toLowerCase() || "";
        const about = (item.aboutThisItem || []).join(" ").toLowerCase();
        const brandName = item.productDetails?.brand || "";

        // Search match
        if (search && !(title.includes(search.toLowerCase()) || subtitle.includes(search.toLowerCase()) || about.includes(search.toLowerCase()))) {
            return false;
        }

        // Price filter
        const priceNum = parseInt((item.pricing?.price || "0").replace(/[^0-9]/g, ""));
        if (minPrice && priceNum < parseInt(minPrice)) return false;
        if (maxPrice && priceNum > parseInt(maxPrice)) return false;

        // Brand filter
        if (brand && brandName.toLowerCase() !== brand.toLowerCase()) return false;

        return true;
    });

    if (loading) return <p>Loading products...</p>;

    // Collect unique brands and colors for dropdowns
    const brands = [...new Set(data.map((p) => p.productDetails?.brand).filter(Boolean))];

    return (
        <div style={{ padding: 20 }}>
            {/* Search + Filters */}
            <div style={{ marginBottom: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option value="">All Brands</option>
                    {brands.map((b, i) => (
                        <option key={i} value={b}>{b}</option>
                    ))}
                </select>

            </div>

            {/* Product List */}
            <div className="pc-horizontal-spacer"> </div>

            {filtered.length === 0 ? (
                <p>No products match your filters.</p>
            ) : (
                filtered.map((item, idx) => (
                    <MiniProductCard data={item} />
                ))
            )}
        </div>
    );
}

export default Search;
