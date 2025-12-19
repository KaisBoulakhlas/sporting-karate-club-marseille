interface LoaderProps {
  padding?: string;
}

export function Loader({ padding = "40px 20px" }: LoaderProps) {
  return (
    <div style={{ textAlign: "center", padding }}>
      <div className="loader" />
    </div>
  );
}
