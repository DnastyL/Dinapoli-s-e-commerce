import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-between">
      <div className="w-80 flex-none md:w-64">
      </div>
      <section className="py-6 flex-grow w-full flex flex-col justify-between h-96 ">
        <div className="flex justify-center">
          <h2>PRODUCTOOOOOOOOOOOOOOOS</h2>
        </div>
        <p>Lista</p>
      </section>
    </main>

    // <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    //   <div className="w-full flex-none md:w-64">
    //     <SideNav />
    //   </div>
    //   <div className="flex-grow p-6 md:overflow-y-auto md:p-12"><h2>PRODUCTOOOOOOOOOOOOOOOS</h2></div>
    // </div>
  );
}
