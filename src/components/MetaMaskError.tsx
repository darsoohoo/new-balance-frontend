import { useMetaMask } from "../hooks/useMetaMask";

export const MetaMaskError = () => {
  const { error, errorMessage, clearError } = useMetaMask();
  return (
    <div style={error ? { backgroundColor: "brown" } : {}}>
      {error && (
        <div onClick={clearError}>
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </div>
  );
};
