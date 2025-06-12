import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Banknote, CheckCircle, Globe } from 'lucide-react';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('mobile');
  const [isPaid, setIsPaid] = useState(false);
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      payment: 'Payment',
      completePayment: 'Complete your payment',
      tripSummary: 'Trip Summary',
      distance: 'Distance',
      duration: 'Duration',
      baseFare: 'Base Fare',
      serviceFee: 'Service Fee',
      total: 'Total',
      paymentMethod: 'Payment Method',
      mobileMoney: 'Mobile Money',
      mobileMoneyDesc: 'Pay with M-Pesa or Tigo Pesa',
      creditCard: 'Credit Card',
      creditCardDesc: 'Pay with card',
      cash: 'Cash',
      cashDesc: 'Pay driver directly',
      payButton: 'Pay',
      securePayment: 'Your payment is secure and encrypted',
      paymentSuccessful: 'Payment Successful!',
      cargoDelivered: 'Your cargo has been delivered successfully.',
      totalPaid: 'Total Amount Paid',
      redirecting: 'Redirecting to rating screen...'
    },
    sw: {
      payment: 'Malipo',
      completePayment: 'Maliza malipo yako',
      tripSummary: 'Muhtasari wa Safari',
      distance: 'Umbali',
      duration: 'Muda',
      baseFare: 'Nauli ya Msingi',
      serviceFee: 'Ada ya Huduma',
      total: 'Jumla',
      paymentMethod: 'Njia ya Malipo',
      mobileMoney: 'Pesa za Simu',
      mobileMoneyDesc: 'Lipa kwa M-Pesa au Tigo Pesa',
      creditCard: 'Kadi ya Mkopo',
      creditCardDesc: 'Lipa kwa kadi',
      cash: 'Pesa Taslimu',
      cashDesc: 'Lipa dereva moja kwa moja',
      payButton: 'Lipa',
      securePayment: 'Malipo yako ni salama na yamefichwa',
      paymentSuccessful: 'Malipo Yamefanikiwa!',
      cargoDelivered: 'Mizigo yako imefikishwa kwa ufanisi.',
      totalPaid: 'Jumla ya Kiasi Kilicholipwa',
      redirecting: 'Inaelekeza kwenye skrini ya ukadiriaji...'
    }
  };

  const t = translations[language as keyof typeof translations];

  const tripDetails = {
    distance: '12.5 km',
    duration: '35 minutes',
    baseFare: 50000, // TZS 50,000
    serviceFee: 10000, // TZS 10,000
    total: 60000 // TZS 60,000
  };

  const paymentMethods = [
    { id: 'mobile', name: t.mobileMoney, icon: Smartphone, description: t.mobileMoneyDesc },
    { id: 'card', name: t.creditCard, icon: CreditCard, description: t.creditCardDesc },
    { id: 'cash', name: t.cash, icon: Banknote, description: t.cashDesc }
  ];

  const formatCurrency = (amount: number) => {
    return `TZS ${amount.toLocaleString()}`;
  };

  const handlePayment = () => {
    setIsPaid(true);
    setTimeout(() => {
      navigate('/client/rate/123');
    }, 2000);
  };

  if (isPaid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.paymentSuccessful}</h2>
          <p className="text-gray-600 mb-6">{t.cargoDelivered}</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold text-gray-800">{formatCurrency(tripDetails.total)}</p>
            <p className="text-sm text-gray-600">{t.totalPaid}</p>
          </div>
          <p className="text-sm text-gray-500">{t.redirecting}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="sw">Kiswahili</option>
          </select>
          <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/client/track/123')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{t.payment}</h1>
                <p className="text-gray-600">{t.completePayment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Trip Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t.tripSummary}</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t.distance}</span>
              <span className="font-medium text-gray-800">{tripDetails.distance}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t.duration}</span>
              <span className="font-medium text-gray-800">{tripDetails.duration}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t.baseFare}</span>
              <span className="font-medium text-gray-800">{formatCurrency(tripDetails.baseFare)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t.serviceFee}</span>
              <span className="font-medium text-gray-800">{formatCurrency(tripDetails.serviceFee)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold text-gray-800">{t.total}</span>
              <span className="font-bold text-gray-800">{formatCurrency(tripDetails.total)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t.paymentMethod}</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedPayment === method.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    selectedPayment === method.id ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <method.icon className={`h-6 w-6 ${
                      selectedPayment === method.id ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  {selectedPayment === method.id && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Button */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <button
            onClick={handlePayment}
            className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            {t.payButton} {formatCurrency(tripDetails.total)}
          </button>
          <p className="text-center text-sm text-gray-500 mt-3">
            {t.securePayment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;