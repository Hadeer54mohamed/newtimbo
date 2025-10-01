"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Breadcrumb from "@/components/Common/Breadcrumb";
import OrderTracking from "@/components/OrderTracking";
import { getOrdersByPhone, type Order } from "@/services/apiOrders";

const TrackOrderPage = () => {
  const locale = useLocale();
  const t = useTranslations("orderTracking");
  const [searchValue, setSearchValue] = useState("");
  const [searchMethod, setSearchMethod] = useState<"orderId" | "phone">(
    "orderId"
  );
  const [showTracking, setShowTracking] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      if (searchMethod === "phone") {
        try {
          const { orders: phoneOrders, error } = await getOrdersByPhone(
            searchValue
          );

          if (error || !phoneOrders || phoneOrders.length === 0) {
            // Handle no orders found
            setOrders([]);
            setShowTracking(true);
          } else if (phoneOrders.length === 1) {
            // If only one order, go directly to its details
            const singleOrder = phoneOrders[0];
            setSelectedOrderId(singleOrder.id);
            setOrders([]);
            setShowTracking(true);
          } else {
            // Multiple orders found - show list for selection
            setOrders(phoneOrders);
            setSelectedOrderId("");
            setShowTracking(true);
          }
        } catch (error) {
          console.error("Error fetching orders by phone:", error);
          setOrders([]);
          setShowTracking(true);
        }
      } else {
        setSelectedOrderId(searchValue);
        setShowTracking(true);
      }
    }
  };

  const handleReset = () => {
    setSearchValue("");
    setSearchMethod("orderId");
    setShowTracking(false);
    setOrders([]);
    setSelectedOrderId("");
  };

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setOrders([]);
  };

  return (
    <>
      <Breadcrumb title={t("title")} pages={[t("title")]} />

      <section className="py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {!showTracking ? (
            /* Search Input Form */
            <div className="bg-white shadow-1 rounded-[10px] p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-dark mb-4">
                  {t("title")}
                </h1>
                <p className="text-dark-5 text-lg">{t("enterOrderNumber")}</p>
              </div>

              <form onSubmit={handleTrackOrder} className="max-w-md mx-auto">
                {/* Search Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-dark mb-3">
                    {t("selectSearchMethod")}
                  </label>
                  <div className="flex space-x-4 items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="searchMethod"
                        value="orderId"
                        checked={searchMethod === "orderId"}
                        onChange={(e) =>
                          setSearchMethod(e.target.value as "orderId" | "phone")
                        }
                        className="ml-2"
                      />
                      <span className="text-sm text-dark">
                        {t("searchByOrderId")}
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="searchMethod"
                        value="phone"
                        checked={searchMethod === "phone"}
                        onChange={(e) =>
                          setSearchMethod(e.target.value as "orderId" | "phone")
                        }
                        className="ml-2"
                      />
                      <span className="text-sm text-dark">
                        {t("searchByPhone")}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="searchValue"
                    className="block text-sm font-medium text-dark mb-2"
                  >
                    {searchMethod === "orderId"
                      ? t("orderNumber")
                      : t("phoneNumber")}
                  </label>
                  <input
                    type={searchMethod === "phone" ? "tel" : "text"}
                    id="searchValue"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={
                      searchMethod === "orderId"
                        ? "12345678-1234-1234-1234-123456789abc"
                        : "01********"
                    }
                    className="w-full px-4 py-3 border border-gray-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue text-white py-3 px-6 rounded-md hover:bg-blue-dark transition-colors font-medium"
                >
                  {t("trackOrder")}
                </button>
              </form>

              {/* Quick Info */}
              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <div className="flex items-start">
                  <div className="text-blue text-2xl ml-3">💡</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-dark mb-2">
                      {locale === "ar" ? "نصائح مفيدة:" : "Helpful Tips:"}
                    </h3>
                    <ul className="text-sm text-blue-dark space-y-1">
                      <li>
                        {locale === "ar"
                          ? "• رقم الطلب يتكون من أرقام وحروف (مثل: abc123-def456)"
                          : "• Order number consists of numbers and letters (e.g., abc123-def456)"}
                      </li>
                      <li>
                        {locale === "ar"
                          ? "• رقم الهاتف يجب أن يكون بالضبط كما أدخلته عند الطلب"
                          : "• Phone number should be exactly as entered during order"}
                      </li>
                      <li>
                        {locale === "ar"
                          ? "• تأكد من عدم وجود مسافات إضافية في الرقم"
                          : "• Make sure there are no extra spaces in the number"}
                      </li>
                      <li>
                        {locale === "ar"
                          ? "• إذا لم تجد طلبك، يرجى الاتصال بخدمة العملاء"
                          : "• If you can't find your order, please contact customer service"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Search Results */
            <div className="space-y-6">
              {/* Back Button */}
              <div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center text-blue hover:text-blue-dark transition-colors"
                >
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={locale === "ar" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                    />
                  </svg>
                  {locale === "ar" ? "البحث عن طلب آخر" : "Track Another Order"}
                </button>
              </div>

              {/* Show Multiple Orders List */}
              {searchMethod === "phone" && orders.length > 0 ? (
                <div className="bg-white shadow-1 rounded-[10px] p-8">
                  <h2 className="text-2xl font-bold text-dark mb-6 text-center">
                    {locale === "ar" ? "طلباتك" : "Your Orders"}
                  </h2>
                  <p className="text-dark-5 mb-6 text-center">
                    {locale === "ar"
                      ? `تم العثور على ${orders.length} طلب. اختر الطلب الذي تريد تتبعه:`
                      : `Found ${orders.length} orders. Select the order you want to track:`}
                  </p>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-3 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleViewOrder(order.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-dark mb-2">
                              {locale === "ar" ? "رقم الطلب:" : "Order ID:"}{" "}
                              <span className="text-blue">{order.id}</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-dark-5">
                                  {locale === "ar" ? "التاريخ:" : "Date:"}
                                </span>
                                <span className="font-medium text-dark block">
                                  {new Date(
                                    order.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div>
                                <span className="text-dark-5">
                                  {locale === "ar" ? "الحالة:" : "Status:"}
                                </span>
                                <span className="font-medium text-dark block capitalize">
                                  {order.status}
                                </span>
                              </div>
                              <div>
                                <span className="text-dark-5">
                                  {locale === "ar" ? "المجموع:" : "Total:"}
                                </span>
                                <span className="font-bold text-dark block">
                                  {order.total_price.toFixed(2)}{" "}
                                  {locale === "ar" ? "ج.م" : "EGP"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewOrder(order.id);
                              }}
                              className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-dark transition-colors text-sm font-medium"
                            >
                              {locale === "ar" ? "تتبع الطلب" : "Track Order"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : searchMethod === "phone" &&
                orders.length === 0 &&
                !selectedOrderId ? (
                /* No Orders Found */
                <div className="bg-white shadow-1 rounded-[10px] p-8 text-center">
                  <div className="text-red-500 text-6xl mb-4">⚠️</div>
                  <h2 className="text-2xl font-semibold text-dark mb-4">
                    {t("ordersNotFound")}
                  </h2>
                  <p className="text-dark-5 mb-6">{t("ordersNotFoundDesc")}</p>
                  <button
                    onClick={handleReset}
                    className="inline-block bg-blue text-white px-6 py-3 rounded-md hover:bg-blue-dark transition-colors"
                  >
                    {locale === "ar" ? "حاول مرة أخرى" : "Try Again"}
                  </button>
                </div>
              ) : (
                /* Single Order Tracking */
                <>
                  {selectedOrderId ? (
                    <OrderTracking orderId={selectedOrderId} />
                  ) : (
                    <div className="bg-white shadow-1 rounded-[10px] p-8 text-center">
                      <div className="text-red-500 text-6xl mb-4">⚠️</div>
                      <h2 className="text-2xl font-semibold text-dark mb-4">
                        خطأ في تحميل الطلب
                      </h2>
                      <p className="text-dark-5 mb-6">
                        لم يتم تحديد رقم الطلب بشكل صحيح
                      </p>
                      <button
                        onClick={handleReset}
                        className="inline-block bg-blue text-white px-6 py-3 rounded-md hover:bg-blue-dark transition-colors"
                      >
                        {locale === "ar" ? "حاول مرة أخرى" : "Try Again"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TrackOrderPage;
