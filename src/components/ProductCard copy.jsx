import React from "react";

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
    offers,
    warrantyAndService,
    variants = [],
    productDetails,
    technicalSpecs,
    aboutThisItem = [],
  } = data;

  return (
    <article className="pc-card">
      {/* Category / breadcrumb */}
      {categoryPath && (
        <div className="pc-breadcrumb">{categoryPath}</div>
      )}

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
          />
        </div>
      </header>

      {/* Delivery */}
      <section className="pc-section pc-grid3">
        <Card title="Delivery">
          <Row label="Standard" value={delivery?.standard} />
          <Row label="Fastest" value={delivery?.fastest} />
        </Card>
       {/*  <Card title="Offers">
          {offers?.cashback && <Row label="Cashback" value={offers.cashback} />}
          {offers?.bankOffers && <Row label="Bank offers" value={offers.bankOffers} />}
          {offers?.noCostEmi && <Row label="No Cost EMI" value="Available" />}
          {offers?.totalOffers != null && <Row label="Total offers" value={String(offers.totalOffers)} />}
          {purchaseOptions?.emi && (
            <>
              <div className="pc-divider" />
              <Row label="EMI starts at" value={purchaseOptions.emi.startsAt} />
              <Row label="No Cost EMI" value={purchaseOptions.emi.noCostEmiAvailable ? "Yes" : "No"} />
              {purchaseOptions.emi.emiSavings && (
                <Row label="EMI savings" value={purchaseOptions.emi.emiSavings} />
              )}
            </>
          )}
        </Card>
        <Card title="Warranty & Service">
          {warrantyAndService?.replacementWindow && (
            <Row label="Replacement" value={warrantyAndService.replacementWindow} />
          )}
          {warrantyAndService?.warranty && <Row label="Warranty" value={warrantyAndService.warranty} />}
          {warrantyAndService?.cashOnDelivery != null && (
            <Row label="Cash on Delivery" value={warrantyAndService.cashOnDelivery ? "Available" : "Not available"} />
          )}
          {warrantyAndService?.topBrand && <Row label="Top Brand" value="Yes" />}
        </Card> */}
      </section>

      {/* Variants */}
      {/* {variants.length > 0 && (
        <section className="pc-section">
          <h2 className="pc-h2">Variants</h2>
          <div className="pc-variants">
            {variants.map((v, i) => (
              <div className="pc-variant" key={i}>
                <div className="pc-variant-top">
                  <span className="pc-variant-color">{v.color}</span>
                  {v.savings && <span className="pc-badge">{v.savings} off</span>}
                </div>
                <div className="pc-variant-prices">
                  <span className="pc-price">{v.price}</span>
                  {v.mrp && <span className="pc-mrp">M.R.P. {v.mrp}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )} */}

      {/* Specs & About */}
      <section className="pc-section pc-grid2">
{/*         <Card title="Technical Specs">
          <SpecRow label="Colour" value={technicalSpecs?.colour} />
          <SpecRow label="Ear Placement" value={technicalSpecs?.earPlacement} />
          <SpecRow label="Form Factor" value={technicalSpecs?.formFactor} />
          <SpecRow label="Impedance" value={technicalSpecs?.impedance} />
        </Card> */}
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

function Actions({ buttons = [], other = [], paymentMethods = [] }) {
  return (
    <div className="pc-actions">
      <div className="pc-btnrow">
        {buttons.includes("Add to Cart") && <button className="pc-btn">Add to Cart</button>}
        {buttons.includes("Buy Now") && <button className="pc-btn pc-btn-primary">Buy Now</button>}
      </div>
      {!!other?.length && (
        <div className="pc-other">
          {other.map((o, i) => (
            <span key={i} className="pc-muted">• {o} </span>
          ))}
        </div>
      )}
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


export { ProductCard };