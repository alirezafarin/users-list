const DetailsSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </section>
);

export default DetailsSection;
