const Home = () => {
  return (
    <div
      className="text-white relative  flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url("https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/campaigns/global/grsp-2025/dream-destinations/hn-dream-destination-city.jpg")`,

        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "78vh",
        width: "100%",
      }}
    >
      {/* <div
        className="absolute inset-0 bg-black opacity-50"
      ></div> */}
      <div className="wrapper space-y-8">
        <h2 className="text-5xl">Dream destinations meet perfect offers</h2>
        <p className="text-lg">Save up to 20%*</p>
        <button className="border border-white font-semibold rounded-full px-5 py-3">
          Book now
        </button>
      </div>
    </div>
  );
};

export default Home;
