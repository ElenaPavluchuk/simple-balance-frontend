import CreateExchangeRateForm from "../shared/ui/ManageContent/CreateExchangeRateForm";

export default function ManageContenPage() {
  return (
    <div className="w-full h-full flex flex-col items-center gap-4 p-4">
      ManageContent Page
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <CreateExchangeRateForm />
      </div>
    </div>
  );
}
