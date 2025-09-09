import React, { useState, useEffect } from "react";

/**
 * ProductCard
 * Props:
 *  - data: JSON object in the exact shape we produced earlier
 */
export default function ProductCard({ data }) {
    if (!data) return <p>No product data.</p>;

    const {
        categoryPath,
        pricing,
        delivery,
        availability,
        purchaseOptions,
        productDetails,
        aboutThisItem = [],
    } = data;

    return (
        <article className="pc-card">
            {/* Category / breadcrumb */}
            {/* {categoryPath && (
                <div className="pc-breadcrumb">{categoryPath}</div>
            )}
            */}
            {/* Header */}
            <header className="pc-header">
                <div className="pc-titlewrap">
                    <h1 className="pc-title">{productDetails?.title}</h1>
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
                        <span> 
                            <ImageGallery images={productDetails.images} />
                        </span>
                    </div>
                </div>

                {/* Price box */}
                <div className="pc-pricebox">

                    <Price
                        price={pricing?.price}
                        mrp={pricing?.mrp}
                        savingsPercent={pricing?.savingsPercent}
                        inclusive={pricing?.inclusiveOfTaxes}
                    />
                    <div className="pc-availability">
                        <Row label="Availability" value={availability?.status} />
                        <Row label="Ships from" value={availability?.shipsFrom} />
                        <Row label="Sold by" value={availability?.soldBy} />
                        {availability?.quantityDefault != null && (
                            <Row label="Default qty" value={String(availability.quantityDefault)} />
                        )}

                    </div>

                    <Actions
                        buttons={purchaseOptions?.buttons}
                        other={purchaseOptions?.otherOptions}
                        paymentMethods={purchaseOptions?.paymentMethods}
                        availability={availability}
                    />

                    <section className="pc-section">
                        <Card title="Delivery">
                            <Row label="Standard" value={delivery?.standard} />
                            <Row label="Fastest" value={delivery?.fastest} />
                        </Card>
                    </section>
                </div>
            </header>

            {/* Delivery */}

            {/* Specs & About */}
            <section className="pc-section ">
                <Card title="About this item">
                    {aboutThisItem?.length ? (
                        <ul className="pc-list">
                            {aboutThisItem.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                    ) : (
                        <p className="pc-muted">No details provided.</p>
                    )}
                </Card>
            </section>
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

function ImageGallery({ images = [] }) {
    const [main, setMain] = useState(images[0] || null);
    const styles = {
        gallery: {
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            gap: 3,
            objectFit: "cover",
            maxWidth: 300,
            maxHeight: 300,
            margin: "0 auto",
        },
        main: {
            objectFit: "cover",
            borderRadius: 8,
            border: "1px solid #ddd",
            width: 300,
            height: 300,
            background: "#fff",
            display: "flex",
            justifyContent: "center",
        },

        thumbs: {
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "left"
        },

        thumb: {
            width: 35,
            height: 35,
            objectFit: "cover",
            cursor: "pointer",
            borderRadius: 8,
            padding: 2,
            background: "#fff"
        }
    };

    console.log("Gallery images:-----", main);
    if (!images.length) return <p>No images available</p>;

    return (
        <div style={styles.gallery}>

            {/* Main Image */}
            <div style={styles.main}>
                <img
                    src={main}
                    alt="Product"
                    style={{ width: "300", height: "300", objectFit: "contain" }}
                />
            </div>

            {/* Thumbnails */}
            <div style={styles.thumbs}>
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`Thumbnail ${i}`}
                        onClick={() => setMain(img)}
                        style={{
                            ...styles.thumb,
                            border: img === main ? "2px solid #2563eb" : "1px solid #ddd"
                        }}
                    />
                ))}
            </div>
        </div>
    );
}


export { ProductCard };