
export function range(start: number, end: number, step = 1) {
    const len = Math.floor((end - start) / step) + 1

    return Array<number>(len).fill(0).map((_: any, idx: number) => start + idx)
}

export function dataOrNone(data: any) {
    
    return data && data !== 'nan' ? data : "None"
}

export function getStatus(data: any) {
    switch(data) {
        case "1":
            return "Conset form";
        case "2":

            return "Perfomance";
        case "3":
            return "Application details"
        
        case "4":
            return "Fee statement" 
        default:
            return ""
    }
}

export function getCash(value: any) {
    return new Intl.NumberFormat('en-KE', { 
        style: 'currency', 
        currency: 'KSH',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
    }).format(value)
}