export default function renderIf(condition: any, content: any) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}