import React, { useState, useRef, useEffect } from 'react';
import './Accordion.scss';

const Accordion = ({ children, opened = false, label }: any) => {
  const [op, setOp] = useState(!!opened);
  const [maxHeight, setMaxHeight] = useState('0px');
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) {
      if (op) setMaxHeight(panelRef.current.scrollHeight + 'px');
      else setMaxHeight('0px');
    }
  }, [op, panelRef, panelRef.current?.scrollHeight]);

  return (
    <div className="accordion">
      <button
        type="button"
        onClick={() => setOp(!op)}
        className={`btnAccordion ${op ? 'active' : ''}`}
      >
        {label}
      </button>
      <div className="panel" ref={panelRef} style={{ maxHeight }}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
