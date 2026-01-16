import { Async } from "../util";
import {
    IAbout,
    ICadesSignedData,
    ICPAttribute,
    ICPCertificate,
    ICPCertificates,
    ICPEnvelopedData,
    ICPHashedData2,
    ICPRecipients,
    ICPSigner,
    ICPSigners,
    ICPStore,
    IPrivateKey,
    IRawSignature,
    ISignedXML,
    IVersion,
} from "./cadescom";

export interface IPrivateKeyAsync extends Async<IPrivateKey> {
    propset_CachePin(isCached: boolean): Promise<void>;
}

export interface ICPCertificateAsync extends Async<ICPCertificate> {
}

export interface ICPRecipientsAsync extends Async<ICPRecipients> {
}

export interface ICPEnvelopedDataAsync extends Async<ICPEnvelopedData> {
    propset_Algorithm(algorithm: ICPEnvelopedData['Algorithm']): Promise<void>;

    propset_Content(content: ICPEnvelopedData['Content']): Promise<void>;
}

export interface ICPSignerAsync extends Async<ICPSigner> {
    propset_Certificate(certificate: Async<ICPSigner['Certificate']>): Promise<void>;

    propset_CheckCertificate(checkCertificate: ICPSigner['CheckCertificate']): Promise<void>;

    propset_KeyPin(keyPin: ICPSigner['KeyPin']): Promise<void>;

    propset_Options(options: ICPSigner['Options']): Promise<void>;

    propset_TSAAddress(TSAAddress: ICPSigner['TSAAddress']): Promise<void>;
}

export interface ICadesSignedDataAsync extends Async<ICadesSignedData> {
    propset_DisplayData(displayData: ICadesSignedData['DisplayData']): Promise<void>;

    propset_Content(content: ICadesSignedData['Content']): Promise<void>;

    propset_ContentEncoding(contentEncoding: ICadesSignedData['ContentEncoding']): Promise<void>;
}

export interface IVersionAsync extends Async<IVersion> {
}

export interface IAboutAsync extends Async<IAbout> {
}

export interface ICPSignersAsync extends Async<ICPSigners> {
}

export interface ISignedXMLAsync extends Async<ISignedXML> {
    propset_Content(content: ISignedXML['Content']): Promise<void>;

    propset_DigestMethod(digestMethod: ISignedXML['DigestMethod']): Promise<void>;

    propset_SignatureMethod(signatureMethod: ISignedXML['SignatureMethod']): Promise<void>;

    propset_SignatureType(signatureType: ISignedXML['SignatureType']): Promise<void>;
}

export interface ICPHashedDataAsync extends Async<ICPHashedData2> {
    propset_Algorithm(algorithm: ICPHashedData2["Algorithm"]): Promise<void>;

    propset_DataEncoding(dataEncoding: ICPHashedData2["DataEncoding"]): Promise<void>;
}

export interface ICPAttributeAsync extends Async<ICPAttribute> {
    propset_Name(name: ICPAttribute['Name']): Promise<void>;

    propset_Value(value: ICPAttribute['Value']): Promise<void>;

    propset_ValueEncoding(valueEncoding: ICPAttribute['ValueEncoding']): Promise<void>;
}

export interface IRawSignatureAsync extends Async<IRawSignature> {
}

export interface ICPCertificatesAsync<T = ICPCertificate> extends Async<ICPCertificates<T>> {
}

export interface ICPStoreAsync<T = ICPCertificates> extends Async<ICPStore<T>> {
}
