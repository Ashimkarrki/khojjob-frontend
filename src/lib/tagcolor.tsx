export function getColor(name: string) {
  const colorMap: { [index: string]: string } = {
    A: "bg-red-100 text-red-800",
    B: "bg-orange-100 text-orange-800",
    C: "bg-amber-100 text-amber-800",
    D: "bg-yellow-100 text-yellow-800",
    E: "bg-lime-100 text-lime-800",
    F: "bg-green-100 text-green-800",
    G: "bg-emerald-100 text-emerald-800",
    H: "bg-teal-100 text-teal-800",
    I: "bg-cyan-100 text-cyan-800",
    J: "bg-sky-100 text-sky-800",
    K: "bg-blue-100 text-blue-800",
    L: "bg-indigo-100 text-indigo-800",
    M: "bg-violet-100 text-violet-800",
    N: "bg-purple-100 text-purple-800",
    O: "bg-fuchsia-100 text-fuchsia-800",
    P: "bg-pink-100 text-pink-800",
    Q: "bg-rose-100 text-rose-800",
    R: "bg-red-200 text-red-900",
    S: "bg-orange-200 text-orange-900",
    T: "bg-amber-200 text-amber-900",
    U: "bg-yellow-200 text-yellow-900",
    V: "bg-lime-200 text-lime-900",
    W: "bg-green-200 text-green-900",
    X: "bg-emerald-200 text-emerald-900",
    Y: "bg-teal-200 text-teal-900",
    Z: "bg-cyan-200 text-cyan-900",
  };

  return colorMap[name[0].toUpperCase()];
}
