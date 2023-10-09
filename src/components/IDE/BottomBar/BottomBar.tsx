const BottomBar = () => {
  return (
    <div className="text-white border-t dark:border-black py-[1px] px-3 text-sm w-full bg-blue-600 dark:bg-violet-500 flex justify-between">
      <p>IBPS IDE v1.0.0 • IBPS Interpreter v2.0.0</p>
      <p className="underline cursor-pointer">
        Login/Register to Sync Your Files to the Cloud
      </p>
    </div>
  );
};

export default BottomBar;

