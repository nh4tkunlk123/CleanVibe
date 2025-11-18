import React, { useState } from "react";

export default function CleanVibe() {
  const AVG_PRICE = 60000; // giá trung bình mỗi suất

  const sampleMenu = [
    { id: 1, name: "Cơm Gà Healthy", desc: "Ức gà nướng, rau củ, cơm lứt", price: 60000, img: "https://barona.vn/storage/com-gao-lut-uc-ga-vi-sa.jpg" },
    { id: 2, name: "Salad Ức Gà", desc: "Rau tươi, ức gà áp chảo, sốt chanh", price: 60000, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Combo Eat Clean", desc: "Cân bằng protein, carbs, rau", price: 60000, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Bowl Đậu Hũ", desc: "Đậu hũ áp chảo, quinoa, bơ", price: 60000, img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80" }
  ];

  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  function addToCart(item) {
    setCart(prev => {
      const found = prev.find(p => p.id === item.id);
      if (found) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(p => p.id !== id));
  }

  function changeQty(id, delta) {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p));
  }

  function total() {
    return cart.reduce((s, c) => s + c.price * c.qty, 0);
  }

  function formatVND(n) {
    return n.toLocaleString("vi-VN") + "đ";
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">CV</div>
            <div>
              <div className="font-bold text-lg">Clean Vibe</div>
              <div className="text-xs">Eat clean • Live clean</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            <a href="#menu" className="hover:underline">Menu</a>
            <a href="#benefit" className="hover:underline">Lợi ích</a>
            <a href="#feedback" className="hover:underline">Đánh giá</a>
            <button onClick={() => setOpen(true)} className="bg-white text-emerald-600 px-3 py-1 rounded shadow">Giỏ hàng ({cart.length})</button>
          </nav>

          <button onClick={() => setOpen(true)} className="md:hidden bg-white text-emerald-600 px-3 py-1 rounded">Giỏ ({cart.length})</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Clean Vibe — Eat Clean</h1>
            <p className="mt-4 text-gray-700">Suất ăn lành mạnh, chế biến tươi mỗi ngày. Giá trung bình: <strong>{formatVND(AVG_PRICE)}</strong>.</p>

            <div className="mt-6 flex gap-3">
              <a href="#menu" className="bg-emerald-600 text-white px-5 py-3 rounded-lg shadow">Xem Menu</a>
              <a href="#contact" className="border border-emerald-600 text-emerald-600 px-5 py-3 rounded-lg">Liên hệ</a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{formatVND(AVG_PRICE)}</div>
                <div className="text-sm text-gray-500">Trung bình / suất</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%+</div>
                <div className="text-sm text-gray-500">Nguyên liệu tươi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8/5</div>
                <div className="text-sm text-gray-500">Đánh giá trung bình</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80" alt="hero" className="w-full h-80 object-cover" />
          </div>
        </section>

        <section id="menu" className="mt-16">
          <h2 className="text-2xl font-bold">Menu Eat Clean</h2>
          <p className="text-gray-600 mt-2">Chọn món ngon, đủ dinh dưỡng, ship tận nơi.</p>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleMenu.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
                <img src={item.img} alt={item.name} className="w-full h-40 object-cover rounded-md" />
                <div className="mt-3 flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-emerald-600 font-bold">{formatVND(item.price)}</div>
                  <button onClick={() => addToCart(item)} className="bg-emerald-600 text-white px-3 py-2 rounded-lg">Thêm vào giỏ</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="benefit" className="mt-16">
          <h2 className="text-2xl font-bold">Lợi ích khi ăn Eat Clean</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h4 className="font-semibold">Giảm mỡ</h4>
              <p className="text-sm text-gray-500 mt-2">Công thức ít dầu, đầy đủ protein.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h4 className="font-semibold">Tăng năng lượng</h4>
              <p className="text-sm text-gray-500 mt-2">Cân bằng carbs giúp ổn định năng lượng cả ngày.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h4 className="font-semibold">Tiện lợi</h4>
              <p className="text-sm text-gray-500 mt-2">Đặt trước, ship nhanh, nhận hàng nóng hoặc lạnh theo yêu cầu.</p>
            </div>
          </div>
        </section>

        <section id="feedback" className="mt-16">
          <h2 className="text-2xl font-bold">Đánh giá khách hàng</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            <blockquote className="bg-white p-6 rounded-xl shadow">
              <p>“Món ăn ngon, tươi và mình cảm thấy nhẹ bụng hơn!”</p>
              <div className="mt-3 text-sm text-gray-500">— Nhật, Dopdop yes yes</div>
            </blockquote>
            <blockquote className="bg-white p-6 rounded-xl shadow">
              <p>“Giá hợp lý, đóng gói sạch sẽ. Recommend!”</p>
              <div className="mt-3 text-sm text-gray-500">— Huy, Skibidi</div>
            </blockquote>
          </div>
        </section>

        <section id="contact" className="mt-16 mb-12">
          <div className="bg-white p-6 rounded-xl shadow md:flex md:items-center md:justify-between">
            <div>
              <h3 className="font-bold">Muốn đặt ngay?</h3>
              <p className="text-sm text-gray-500">Gọi/Zalo: <strong>0947 601 210</strong> hoặc gửi tin nhắn để đặt hàng.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <a href="#menu" className="bg-emerald-600 text-white px-4 py-2 rounded-lg">Xem Menu</a>
            </div>
          </div>
        </section>
      </main>

      {/* --- PHẦN FOOTER MỚI --- */}
      <footer className="bg-gray-900 text-gray-300 pt-10 pb-6">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Grid Footer 4 Cột */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
            
            {/* Cột 1: Logo & Giới thiệu */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">CV</div>
                <div className="font-bold text-lg text-white">Clean Vibe</div>
              </div>
              <p className="text-sm text-gray-400">Suất ăn Eat Clean tươi mới mỗi ngày. Giúp bạn đạt được mục tiêu sức khỏe và vóc dáng.</p>
              <div className="mt-4 flex gap-4 text-white">
                {/* Thay bằng icon mạng xã hội thực tế nếu cần */}
                <a href="#" className="hover:text-emerald-500">FB</a>
                <a href="#" className="hover:text-emerald-500">IG</a>
                <a href="#" className="hover:text-emerald-500">Zalo</a>
              </div>
            </div>

            {/* Cột 2: Liên kết nhanh */}
            <div>
              <h5 className="font-semibold text-white mb-4">Menu & Lợi ích</h5>
              <ul className="space-y-2">
                <li><a href="#menu" className="text-sm text-gray-400 hover:text-emerald-500">Menu Hôm Nay</a></li>
                <li><a href="#benefit" className="text-sm text-gray-400 hover:text-emerald-500">Vì sao chọn Clean Vibe</a></li>
                <li><a href="#feedback" className="text-sm text-gray-400 hover:text-emerald-500">Đánh giá khách hàng</a></li>
                <li><a href="#contact" className="text-sm text-gray-400 hover:text-emerald-500">Liên hệ đặt hàng</a></li>
              </ul>
            </div>

            {/* Cột 3: Thông tin liên hệ */}
            <div>
              <h5 className="font-semibold text-white mb-4">Liên hệ</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="tel:0947601210" className="hover:text-emerald-500">SĐT/Zalo: 0947 601 210</a></li>
                <li>Email: thekiet1210@gmail.com</li>
                <li>Giờ mở cửa: 7:00 - 22:00 (T2 - CN)</li>
                <li>Địa chỉ: 47 Võ Oanh</li>
              </ul>
            </div>
            
            {/* Cột 4: Chính sách */}
            <div>
              <h5 className="font-semibold text-white mb-4">Chính sách</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-500">Chính sách đổi trả</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-500">Chính sách giao hàng</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-500">Điều khoản sử dụng</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-500">Bảo mật thông tin</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Clean Vibe. All rights reserved.
          </div>
        </div>
      </footer>
      {/* --- KẾT THÚC PHẦN FOOTER MỚI --- */}

      {/* CART DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
          <div className="w-96 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Giỏ hàng</h3>
              <button onClick={() => setOpen(false)} className="text-gray-500">Đóng</button>
            </div>

            <div className="mt-4">
              {cart.length === 0 ? (
                <div className="text-gray-500">Giỏ hàng trống.</div>
              ) : (
                cart.map(c => (
                  <div key={c.id} className="flex items-center gap-3 border-b py-3">
                    <img src={c.img} alt={c.name} className="w-16 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-sm text-gray-500">{formatVND(c.price)} x {c.qty}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(c.id, -1)} className="px-2">-</button>
                      <div>{c.qty}</div>
                      <button onClick={() => changeQty(c.id, 1)} className="px-2">+</button>
                      <button onClick={() => removeFromCart(c.id)} className="text-red-500 ml-3">X</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between font-bold">
                <div>Tổng</div>
                <div>{formatVND(total())}</div>
              </div>
              <div className="mt-4">
                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg">Thanh toán</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}