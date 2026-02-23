"use client";
import { useState } from "react";

export default function SearchableSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  displayField,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Cari item yang sedang terpilih
  const selectedItem = options.find((opt) => opt.id === value);

  // Logika Filter
  const filteredOptions = options.filter((opt) =>
    (opt[displayField] || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative">
      <label className="block text-sm font-bold text-gray-600 mb-1 uppercase tracking-tight">
        {label} <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        <input
          type="text"
          className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amerta-500 outline-none transition-all shadow-sm 
            ${selectedItem && !searchTerm ? "text-gray-900 bg-amerta-50/20" : "text-gray-600"}`}
          // Placeholder hanya muncul jika benar-benar tidak ada data terpilih
          placeholder={selectedItem ? "" : placeholder}
          // INI KUNCINYA: Jika tidak sedang mengetik, tampilkan nama item terpilih
          value={
            isOpen
              ? searchTerm
              : selectedItem
                ? selectedItem[displayField]
                : searchTerm
          }
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            setSearchTerm("");
          }}
          onBlur={() =>
            setTimeout(() => {
              setIsOpen(false);
              setSearchTerm("");
            }, 200)
          }
        />

        {/* Icon Panah dengan warna dinamis */}
        <div className="absolute right-3 top-3 pointer-events-none">
          <svg
            className={`h-5 w-5 transition-all ${isOpen ? "rotate-180 text-amerta-500" : "text-gray-400"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-100 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto overflow-x-hidden">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div
                key={opt.id}
                className={`px-4 py-3 cursor-pointer border-b border-gray-50 last:border-none transition-colors
                  ${value === opt.id ? "bg-amerta-100 text-amerta-800 font-bold" : "hover:bg-gray-50 text-gray-700"}`}
                onMouseDown={() => {
                  onChange(opt.id);
                  setSearchTerm("");
                  setIsOpen(false);
                }}
              >
                <p className="text-sm">{opt[displayField]}</p>
                {opt.address && (
                  <p className="text-[10px] text-gray-400 font-normal truncate">
                    {opt.address}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-400 italic">
              Data tidak ditemukan...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
