import React from 'react';
import { IconCheck, IconClock, IconCross, IconLeaf } from './Icons';

export const StatusBadge = ({ type, status }) => {
  if (type === 'farming') {
    const isOrganic = status?.toUpperCase() === 'ORGANIC';
    return (
      <span className={`badge ${isOrganic ? 'badge-organic' : 'badge-conventional'}`}>
        {isOrganic && <IconLeaf size={12} />}
        {status}
      </span>
    );
  }

  if (type === 'verification') {
    const s = status?.toUpperCase() || 'PENDING';
    if (s === 'APPROVED') {
      return (
        <span className="badge badge-approved">
          <IconCheck size={13} /> Approved
        </span>
      );
    }
    if (s === 'REJECTED') {
      return (
        <span className="badge badge-rejected">
          <IconCross size={13} /> Rejected
        </span>
      );
    }
    return (
      <span className="badge badge-pending">
        <IconClock size={13} /> Pending Verification
      </span>
    );
  }

  if (type === 'order') {
    const s = status?.toUpperCase() || 'PLACED';
    const config = {
      PLACED: { bg: '#e0f2fe', text: '#0369a1', label: 'Order Placed' },
      CONFIRMED: { bg: '#fef3c7', text: '#b45309', label: 'Confirmed by Farmer' },
      DISPATCHED: { bg: '#e0e7ff', text: '#4338ca', label: 'Dispatched / In Transit' },
      DELIVERED: { bg: '#dcfce7', text: '#15803d', label: 'Delivered' },
      CANCELLED: { bg: '#fee2e2', text: '#b91c1c', label: 'Cancelled' }
    };
    const c = config[s] || config.PLACED;
    return (
      <span
        className="badge"
        style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.text}20` }}
      >
        {c.label}
      </span>
    );
  }

  return <span className="badge">{status}</span>;
};

