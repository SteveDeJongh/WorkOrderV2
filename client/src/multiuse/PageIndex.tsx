type props = {
  title: string;
};

function PageIndex({ title }: props) {
  return (
    <>
      <div className="pane-inner">
        <p>No {title} selected</p>
      </div>
    </>
  );
}

export default PageIndex;
