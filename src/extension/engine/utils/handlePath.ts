export default function handlePath(url: string, path: Record<string, string>): string {
    let parsedUrl = url;
    Object.entries(path).forEach((x)=>{
        parsedUrl.replaceAll(`#${x[0]}`,x[1]);
    });
    return parsedUrl;
}