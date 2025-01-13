const Home = () => {
  return (
    <div
      className="text-white"
      style={{
        backgroundImage: `url(${"https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/campaigns/global/grsp-2025/dream-destinations/hn-dream-destination-city.jpg"})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "90vh",
        width: "100%",
      }}
    >
      <div className="wrapper">
        <h2 className="text-2xl">Dream destinations meet perfect offers</h2>
        <p>Save up to 20%*</p>
        <button className="border border-white rounded-full px-5 py-3">
          Book now
        </button>
      </div>
    </div>
  );
};

export default Home;
