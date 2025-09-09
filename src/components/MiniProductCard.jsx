import React, { useState, useEffect } from "react";

/**
 * ProductCard
 * Props:
 *  - data: JSON object in the exact shape we produced earlier
 */
export default function MiniProductCard({ data }) {
    if (!data) return <p>No product data.</p>;

    const {
        categoryPath,
        pricing,
        availability,
        purchaseOptions,
        productDetails,
        aboutThisItem = [],
    } = data;

    return (
        <article className="pc-grid3">
            <div ><ImageBlock images={productDetails.images} aboutThisItem={aboutThisItem} /></div>
            <div>
                <h2 className="pc-title">{productDetails?.title}</h2>
                {productDetails?.subtitle && (
                    <p className="pc-subtitle">{productDetails.subtitle}</p>
                )}
                <div className="pc-meta">
                    {productDetails?.brand && (
                        <span className="pc-badge">Brand: {productDetails.brand}</span>
                    )}
                    {productDetails?.ratings?.stars && (
                        <Rating
                            stars={Number(productDetails.ratings.stars)}
                            count={productDetails?.ratings?.ratingsCount}
                        />
                    )}
                    {productDetails?.ratings?.purchasesPastMonth && (
                        <span className="pc-muted">
                            {productDetails.ratings.purchasesPastMonth} bought in past month
                        </span>
                    )}
                </div>
            </div>
            <div className="pc-pricebox">
                <Price
                    price={pricing?.price}
                    mrp={pricing?.mrp}
                    savingsPercent={pricing?.savingsPercent}
                    inclusive={pricing?.inclusiveOfTaxes}
                />
                <Actions
                    buttons={purchaseOptions?.buttons}
                    availability={availability}
                />
            </div>
        </article>
    );
}

/* ---------- subcomponents ---------- */

function Rating({ stars = 0, count }) {
    const s = Math.max(0, Math.min(5, stars));
    const full = Math.floor(s);
    const half = s - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
        <span className="pc-rating" title={`${s} out of 5`}>
            {"★".repeat(full)}
            {half ? "☆" : ""}
            {"✩".repeat(empty)}
            {typeof count === "number" && <span className="pc-muted"> ({count})</span>}
        </span>
    );
}

function Price({ price, mrp, savingsPercent, inclusive }) {
    return (
        <div className="pc-pricewrap">
            {price && <div className="pc-price">{price}</div>}
            <div className="pc-price-meta">
                {mrp && <span className="pc-mrp">M.R.P. {mrp}</span>}
                {savingsPercent && <span className="pc-badge">{savingsPercent} off</span>}
                {inclusive && <span className="pc-muted"> · Inclusive of all taxes</span>}
            </div>
        </div>
    );
}

function Actions({ buttons = [], other = [], paymentMethods = [], availability = {} }) {

    const goToAmazon = () => {
        console.log(availability["product-url"])
        if (availability["product-url"]) {
            window.open(availability["product-url"], "_blank");
        }
    }
    return (
        <div className="pc-actions">
            <div className="pc-btnrow">
                {buttons.includes("Buy Now") && <button onClick={goToAmazon} className="pc-btn pc-btn-primary">Buy from {availability.hostingsite} Now</button>}
            </div>

            {!!paymentMethods?.length && (
                <div className="pc-payments">
                    <span className="pc-label">Payment:</span>{" "}
                    <span className="pc-muted">{paymentMethods.join(", ")}</span>
                </div>
            )}
        </div>
    );
}

function Card({ title, children }) {
    return (
        <div className="pc-card-inner">
            {title && <h3 className="pc-h3">{title}</h3>}
            {children}
        </div>
    );
}

function Row({ label, value }) {
    if (!value) return null;
    return (
        <div className="pc-row">
            <span className="pc-label">{label}</span>
            <span className="pc-value">{value}</span>
        </div>
    );
}


function SpecRow({ label, value }) {
    if (!value) return null;
    return (
        <div className="pc-row">
            <span className="pc-label">{label}</span>
            <span className="pc-spec">{value}</span>
        </div>
    );
}

function ImageBlock({ images = [], aboutThisItem = [] }) {
    const main = images[0] || null;
    const styles = {
        main: {
            objectFit: "contain",
            borderRadius: 8,
            width: 150,
            height: 150,
            background: "#fff",
            display: "flex",
            justifyContent: "center",
        },
    };

    if (!images.length) return <p>No images available</p>;

    return (
        <>
            <div style={styles.main}>
                <img
                    src={main}
                    alt="Product"
                />
            </div>
            <div> &nbsp;</div>
            <div className="pc-badge hover-box"  >
                More info
                <div class="hover-content">
                    {aboutThisItem?.length ? (
                        <ul className="pc-list">
                            {aboutThisItem.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                    ) : (
                        <p className="pc-muted">No details provided.</p>
                    )}                
                </div>
            </div>
        </>

    );
}


export { MiniProductCard };