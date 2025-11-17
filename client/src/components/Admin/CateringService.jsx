import React, { useEffect, useState, useMemo } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";

const CateringService = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/admin/catering");
      setItems(res.data?.data || []);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Failed to load catering items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((it) => {
      const name = (it.catererName || "").toLowerCase();
      const details = (it.details || "").toLowerCase();
      return name.includes(q) || details.includes(q);
    });
  }, [items, query]);

  const handleDelete = async (id) => {
    const prev = items;
    try {
      setItems((s) => s.filter((i) => i._id !== id));
      const { data } = await api.delete(`/admin/catering/${id}`);
      toast.success(data.message || "Deleted");
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Delete failed");
      setItems(prev);
    }
  };

  // Add catering modal state
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    catererName: "",
    phone: "",
    bookingCharge: "",
    perPlateVeg: "",
    perPlateJain: "",
    perPlateNonVeg: "",
    details: "",
    status: "Active",
  });
  const [plans, setPlans] = useState([]);
  const [menu, setMenu] = useState([]);
  const [photos, setPhotos] = useState([]);

  const addPlan = () => setPlans((s) => [...s, { name: "", price: "", description: "" }]);
  const updatePlan = (idx, key, value) => setPlans((s) => s.map((p, i) => (i === idx ? { ...p, [key]: value } : p)));
  const removePlan = (idx) => setPlans((s) => s.filter((_, i) => i !== idx));

  const addMenu = () => setMenu((s) => [...s, { name: "", type: "Veg", price: "", description: "" }]);
  const updateMenu = (idx, key, value) => setMenu((s) => s.map((m, i) => (i === idx ? { ...m, [key]: value } : m)));
  const removeMenu = (idx) => setMenu((s) => s.filter((_, i) => i !== idx));

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("catererName", form.catererName);
      fd.append("phone", form.phone);
      fd.append("bookingCharge", form.bookingCharge || "");
      fd.append("perPlateVeg", form.perPlateVeg || "");
      fd.append("perPlateJain", form.perPlateJain || "");
      fd.append("perPlateNonVeg", form.perPlateNonVeg || "");
      fd.append("details", form.details || "");
      fd.append("status", form.status || "Active");
      fd.append("plans", JSON.stringify(plans.map((p) => ({ name: p.name, price: Number(p.price) || 0, description: p.description }))));
      fd.append("menu", JSON.stringify(menu.map((m) => ({ name: m.name, type: m.type, price: Number(m.price) || 0, description: m.description }))));
      photos.forEach((file) => fd.append("photos", file));

      const { data } = await api.post("/admin/catering", fd);
      toast.success(data.message || "Catering created");
      setShowAdd(false);
      setForm({ catererName: "", phone: "", bookingCharge: "", perPlateVeg: "", perPlateJain: "", perPlateNonVeg: "", details: "", status: "Active" });
      setPlans([]);
      setMenu([]);
      setPhotos([]);
      // refresh list
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Create failed");
    }
  };

  if (loading) return <div className="p-6">Loading catering services...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Catering Services</h2>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or description"
            className="px-3 py-2 border rounded-md"
          />
            <button onClick={() => setShowAdd(true)} className="px-3 py-2 bg-green-600 text-white rounded-md">Add Catering</button>
            <button onClick={fetchItems} className="px-3 py-2 bg-indigo-600 text-white rounded-md">Refresh</button>
        </div>
      </div>

      {error ? (
        <div className="text-red-600 mb-4">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-sm text-gray-600">No catering services found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 px-2">Name</th>
                <th className="py-2 px-2">Price</th>
                <th className="py-2 px-2">Description</th>
                <th className="py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((it) => (
                <tr key={it._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <div className="font-medium">{it.catererName || "-"}</div>
                    <div className="text-xs text-gray-500">{it.phone || "-"}</div>
                  </td>
                  <td className="py-3 px-2 text-sm">{it.bookingCharge || "-"}</td>
                  <td className="py-3 px-2 text-sm">
                    <div className="text-xs">Veg: {it.perPlateVeg || '-'}</div>
                    <div className="text-xs">Jain: {it.perPlateJain || '-'}</div>
                    <div className="text-xs">NonVeg: {it.perPlateNonVeg || '-'}</div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toast('Edit not implemented yet')} className="px-2 py-1 bg-yellow-500 text-white rounded text-xs">Edit</button>
                      <button onClick={() => handleDelete(it._id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Catering Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Add Catering Service</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3 max-h-[70vh] overflow-auto pr-2">
              <div className="grid grid-cols-2 gap-3">
                <input required value={form.catererName} onChange={(e)=>setForm(f=>({...f,catererName:e.target.value}))} placeholder="Caterer name" className="px-3 py-2 border rounded" />
                <input required value={form.phone} onChange={(e)=>setForm(f=>({...f,phone:e.target.value}))} placeholder="Phone" className="px-3 py-2 border rounded" />
                <input value={form.bookingCharge} onChange={(e)=>setForm(f=>({...f,bookingCharge:e.target.value}))} placeholder="Booking charge" className="px-3 py-2 border rounded" />
                <input value={form.perPlateVeg} onChange={(e)=>setForm(f=>({...f,perPlateVeg:e.target.value}))} placeholder="Per plate (Veg)" className="px-3 py-2 border rounded" />
                <input value={form.perPlateJain} onChange={(e)=>setForm(f=>({...f,perPlateJain:e.target.value}))} placeholder="Per plate (Jain)" className="px-3 py-2 border rounded" />
                <input value={form.perPlateNonVeg} onChange={(e)=>setForm(f=>({...f,perPlateNonVeg:e.target.value}))} placeholder="Per plate (Non-Veg)" className="px-3 py-2 border rounded" />
              </div>
              <textarea value={form.details} onChange={(e)=>setForm(f=>({...f,details:e.target.value}))} placeholder="Details" className="w-full px-3 py-2 border rounded" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Plans</h4>
                  <button type="button" onClick={addPlan} className="px-2 py-1 bg-green-600 text-white rounded text-sm">Add plan</button>
                </div>
                {plans.map((p, idx) => (
                  <div key={idx} className="mb-2 border p-2 rounded">
                    <div className="flex gap-2">
                      <input value={p.name} onChange={(e)=>updatePlan(idx,'name',e.target.value)} placeholder="Plan name" className="px-2 py-1 border rounded flex-1" />
                      <input value={p.price} onChange={(e)=>updatePlan(idx,'price',e.target.value)} placeholder="Price" className="px-2 py-1 border rounded w-28" />
                      <button type="button" onClick={()=>removePlan(idx)} className="px-2 py-1 bg-red-600 text-white rounded">Remove</button>
                    </div>
                    <input value={p.description} onChange={(e)=>updatePlan(idx,'description',e.target.value)} placeholder="Description" className="mt-2 px-2 py-1 border rounded w-full" />
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Menu</h4>
                  <button type="button" onClick={addMenu} className="px-2 py-1 bg-green-600 text-white rounded text-sm">Add item</button>
                </div>
                {menu.map((m, idx) => (
                  <div key={idx} className="mb-2 border p-2 rounded">
                    <div className="flex gap-2">
                      <input value={m.name} onChange={(e)=>updateMenu(idx,'name',e.target.value)} placeholder="Item name" className="px-2 py-1 border rounded flex-1" />
                      <select value={m.type} onChange={(e)=>updateMenu(idx,'type',e.target.value)} className="px-2 py-1 border rounded w-32">
                        <option>Veg</option>
                        <option>Jain</option>
                        <option>NonVeg</option>
                        <option>Other</option>
                      </select>
                      <input value={m.price} onChange={(e)=>updateMenu(idx,'price',e.target.value)} placeholder="Price" className="px-2 py-1 border rounded w-28" />
                      <button type="button" onClick={()=>removeMenu(idx)} className="px-2 py-1 bg-red-600 text-white rounded">Remove</button>
                    </div>
                    <input value={m.description} onChange={(e)=>updateMenu(idx,'description',e.target.value)} placeholder="Description" className="mt-2 px-2 py-1 border rounded w-full" />
                  </div>
                ))}
              </div>

              <div>
                <label className="block mb-1 font-medium">Photos</label>
                <input type="file" multiple accept="image/*" onChange={(e)=>setPhotos(Array.from(e.target.files))} />
                {photos.length>0 && <div className="text-xs text-gray-600 mt-1">{photos.length} file(s) selected</div>}
              </div>

              <div className="flex items-center justify-end gap-2">
                <button type="button" onClick={()=>setShowAdd(false)} className="px-3 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-3 py-2 bg-indigo-600 text-white rounded">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CateringService;