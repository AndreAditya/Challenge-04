const FooterComponent = () => {
  return (
    <footer className="footer text-center text-lg-start">
      <div
        className="text-center p-3 custom-footer"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", color: "white" }}
      >
        © {new Date().getFullYear()} | Dre Aditya
      </div>
    </footer>
  );
};

export default FooterComponent;
