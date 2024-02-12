declare global {
    interface Window {
        chrome: any;
    }
}

export const printExternal = (url: string) => {
    const printWindow =
        window.open(
            url,
            "Print",
            "left=200, top=200, width=950, height=500, toolbar=0, resizable=0",
        ) ?? new Window();

    printWindow.addEventListener(
        "load",
        function () {
            if (printWindow.chrome) {
                printWindow.print();
                setTimeout(function () {
                    printWindow.close();
                }, 500);
            } else {
                printWindow.print();
                printWindow.close();
            }
        },
        true,
    );
};
