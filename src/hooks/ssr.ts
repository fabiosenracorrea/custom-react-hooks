function useSsr(): boolean {
  const isServer = !(window && window?.document?.documentElement);

  return isServer;
}

export default useSsr;
