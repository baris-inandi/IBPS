import Docs from "./Docs";

interface DocsPdfProps {}

const DocsPdf: React.FC<DocsPdfProps> = () => {
    return <Docs print={true} />;
};

export default DocsPdf;

