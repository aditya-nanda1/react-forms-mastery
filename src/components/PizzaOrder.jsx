import React, { useState, useEffect } from 'react';

const PRICES = {
  size: {
    Small: 299,
    Medium: 499,
    Large: 799
  },
  crust: {
    'New Hand Tossed': 0,
    'Wheat Thin Crust': 50,
    'Cheese Burst': 99,
    'Fresh Pan Pizza': 40
  },
  toppings: {
    'Paneer': 60,
    'Onion': 30,
    'Capsicum': 30,
    'Mushroom': 50,
    'Corn': 30,
    'Chicken': 80,
    'Pepperoni': 90
  },
  sides: {
    'Coke (500ml)': 60,
    'Garlic Bread': 120,
    'Choco Lava Cake': 110,
    'Cheese Dip': 30
  }
};

const PizzaOrder = () => {
  const [order, setOrder] = useState({
    size: 'Medium',
    crust: 'New Hand Tossed',
    toppings: [],
    sides: {},
    quantity: 1
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    let total = PRICES.size[order.size] || 0;
    total += PRICES.crust[order.crust] || 0;

    order.toppings.forEach(t => {
      total += PRICES.toppings[t] || 0;
    });

    Object.entries(order.sides).forEach(([side, qty]) => {
      if (qty > 0) {
        total += (PRICES.sides[side] || 0) * qty;
      }
    });

    total *= order.quantity;
    setTotalPrice(total);
  }, [order]);

  const handleToppingToggle = (topping) => {
    setOrder(prev => {
      const newToppings = prev.toppings.includes(topping)
        ? prev.toppings.filter(t => t !== topping)
        : [...prev.toppings, topping];
      return { ...prev, toppings: newToppings };
    });
  };

  const handleSideChange = (side, delta) => {
    setOrder(prev => {
      const currentQty = prev.sides[side] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return {
        ...prev,
        sides: { ...prev.sides, [side]: newQty }
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
    }, 2000);
  };

  const resetOrder = () => {
    setOrder({
      size: 'Medium',
      crust: 'New Hand Tossed',
      toppings: [],
      sides: {},
      quantity: 1
    });
    setOrderPlaced(false);
  };

  if (orderPlaced) {
    return (
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍕</div>
        <h2 style={{ marginBottom: '1rem', color: 'var(--success)' }}>Order Placed Successfully!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Thank you, Aditya! Your delicious pizza is being prepared.
        </p>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '1.5rem',
          borderRadius: 'var(--radius)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Total Paid: ₹{totalPrice}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Order ID: #{Math.floor(Math.random() * 10000)}</p>
        </div>
        <button onClick={resetOrder} className="btn btn-primary">Place Another Order</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', alignItems: 'start' }}>

      {/* Order Form */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🍕</span> Customize Your Pizza
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Size */}
          <div className="form-group">
            <label className="form-label">Select Size</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {Object.keys(PRICES.size).map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setOrder(p => ({ ...p, size }))}
                  className={`btn ${order.size === size ? 'btn-primary' : ''}`}
                  style={{
                    flex: 1,
                    border: order.size === size ? 'none' : '1px solid var(--border)',
                    background: order.size === size ? '' : 'transparent'
                  }}
                >
                  {size} <br /> <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>₹{PRICES.size[size]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Crust */}
          <div className="form-group">
            <label className="form-label">Select Crust</label>
            <select
              className="form-input"
              value={order.crust}
              onChange={(e) => setOrder(p => ({ ...p, crust: e.target.value }))}
            >
              {Object.keys(PRICES.crust).map(crust => (
                <option key={crust} value={crust}>
                  {crust} {PRICES.crust[crust] > 0 ? `(+₹${PRICES.crust[crust]})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Toppings */}
          <div className="form-group">
            <label className="form-label">Choose Toppings</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
              {Object.keys(PRICES.toppings).map(topping => (
                <label
                  key={topping}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius)',
                    background: order.toppings.includes(topping) ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.05)',
                    border: order.toppings.includes(topping) ? '1px solid var(--primary)' : '1px solid transparent'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={order.toppings.includes(topping)}
                    onChange={() => handleToppingToggle(topping)}
                    style={{ display: 'none' }}
                  />
                  <span style={{ fontSize: '0.9rem' }}>{topping}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>₹{PRICES.toppings[topping]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sides */}
          <div className="form-group">
            <label className="form-label">Add Sides</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.keys(PRICES.sides).map(side => (
                <div key={side} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem' }}>{side}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>₹{PRICES.sides[side]}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => handleSideChange(side, -1)}
                      className="btn"
                      style={{ padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.1)' }}
                    >-</button>
                    <span style={{ width: '1.5rem', textAlign: 'center' }}>{order.sides[side] || 0}</span>
                    <button
                      type="button"
                      onClick={() => handleSideChange(side, 1)}
                      className="btn"
                      style={{ padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.1)' }}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </form>
      </div>

      {/* Order Summary */}
      <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Order Summary</h3>

        <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>{order.size} Pizza</span>
            <span>₹{PRICES.size[order.size]}</span>
          </div>

          {PRICES.crust[order.crust] > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
              <span>{order.crust}</span>
              <span>+₹{PRICES.crust[order.crust]}</span>
            </div>
          )}

          {order.toppings.length > 0 && (
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Toppings:</div>
              {order.toppings.map(t => (
                <div key={t} style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '0.75rem', fontSize: '0.85rem' }}>
                  <span>{t}</span>
                  <span>+₹{PRICES.toppings[t]}</span>
                </div>
              ))}
            </div>
          )}

          {Object.entries(order.sides).map(([side, qty]) => qty > 0 && (
            <div key={side} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{qty} x {side}</span>
              <span>₹{PRICES.sides[side] * qty}</span>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label className="form-label">Quantity</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => setOrder(p => ({ ...p, quantity: Math.max(1, p.quantity - 1) }))}
              className="btn"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >-</button>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{order.quantity}</span>
            <button
              type="button"
              onClick={() => setOrder(p => ({ ...p, quantity: p.quantity + 1 }))}
              className="btn"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >+</button>
          </div>
        </div>

        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '1.25rem',
          fontWeight: 'bold'
        }}>
          <span>Total</span>
          <span style={{ color: 'var(--primary)' }}>₹{totalPrice}</span>
        </div>

        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '1.5rem' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Placing Order...' : `Pay ₹{totalPrice}`}
        </button>
      </div>

    </div>
  );
};

export default PizzaOrder;
