import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notifyMessage, toastMessage } = useMarketplace();
  const activeMsg = notifyMessage || toastMessage;

  if (!activeMsg) return null;

  const isSuccess = activeMsg.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-quiet-fade">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl text-xs font-bold ${
        isSuccess ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-[#FFF9EE] border-[#F2E4C9] text-[#966F1E]'
      }`}>
        {isSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <Info className="w-4 h-4 text-[#B8860B] shrink-0" />}
        <span>{activeMsg.text}</span>
      </div>
    </div>
  );
};
