import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="grid min-h-screen gap-10 bg-slate-500 py-20 px-20 lg:grid-cols-2 xl:grid-cols-3 xl:place-content-center">
      <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800 dark:text-white">
        <span className="text-3xl font-semibold">Select Item</span>
        <ul>
          {[1, 2].map((i) => (
            <div key={i} className="my-2 flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Grey Chair
              </span>
              <span className="font-semibold">$19</span>
            </div>
          ))}
        </ul>
        <div className="mt-2 flex justify-between border-t-2 border-dashed pt-2">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <div className="mx-auto mt-5 w-1/2 rounded-xl bg-blue-500 p-3 text-center text-white hover:bg-teal-500 focus:bg-red-500 active:bg-yellow-500">
          <span>Checkout</span>
        </div>
      </div>
      <div className="group overflow-hidden rounded-2xl bg-white shadow-xl ">
        <div className="p-6 pb-14 portrait:bg-indigo-500 landscape:bg-teal-400">
          <span className="text-2xl text-white">Profile</span>
        </div>
        <div className="relative -top-5 rounded-3xl bg-white p-6">
          <div className="relative -top-16 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 rounded-full bg-red-400 transition-colors group-hover:bg-red-600"></div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$2,310</span>
            </div>
          </div>
          <div className="relative -mt-10 -mb-5 flex flex-col items-center">
            <span className="text-lg font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">미국</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 rounded-2xl bg-white p-10 shadow-xl lg:col-span-2 lg:row-span-2">
        <div className="flex items-center justify-between">
          <span className="">←</span>
          <div className="flex justify-around gap-3">
            <div>
              <span>⭐</span>
              <span> 4.9</span>
            </div>
            <div>
              <span className="rounded-md p-2 shadow-xl">❤️</span>
            </div>
          </div>
        </div>
        <div className="h-72 bg-zinc-400"></div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="mb-1.5 text-xl font-medium">Swoon Lounge</span>
            <span className="text-xs text-gray-500">Chair</span>
          </div>
          <div className="mt-3 mb-5 flex items-center justify-between">
            <div className="space-x-2">
              <button className="h-5 w-5 rounded-full bg-yellow-500 ring-yellow-500 ring-offset-2 transition focus:ring-2"></button>
              <button className="h-5 w-5 rounded-full bg-indigo-500 ring-indigo-500 ring-offset-2 transition focus:ring-2"></button>
              <button className="h-5 w-5 rounded-full bg-teal-500 ring-teal-500 ring-offset-2 transition focus:ring-2"></button>
            </div>
            <div className="flex items-center space-x-5">
              <button className="flex aspect-square w-9 items-center justify-center rounded-lg bg-blue-200 p-1.5 text-xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className="flex aspect-square w-9 items-center justify-center rounded-lg bg-blue-200 p-1.5 text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-medium">$450</span>
            <button className="rounded-lg bg-blue-500 py-2 px-8 text-center text-xs text-white">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-10 shadow-xl">
        <form action="" className="flex flex-col space-y-5">
          <input
            type="text"
            placeholder="username"
            required
            id="username"
            className="peer rounded-md border border-gray-400 p-1"
          />
          <label htmlFor="username" className="text-red-200 peer-valid:hidden">
            username 은 필수입니다.
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
      <div className="rounded-2xl bg-white p-10 shadow-xl">
        <details className="select-none open:bg-indigo-300 open:text-white">
          <summary className="cursor-pointer">Hello</summary>
          <span>Hi!</span>
        </details>
      </div>
      <div className="h-24 rounded-2xl bg-white p-9 shadow-xl">
        <input
          type="file"
          className="file:translate-colors  file:cursor-pointer file:rounded-xl file:border-0 file:bg-purple-300 file:px-5 file:text-white file:hover:border file:hover:border-purple-400 file:hover:bg-white file:hover:text-purple-400"
        />
      </div>
    </div>
  );
};

export default Home;
