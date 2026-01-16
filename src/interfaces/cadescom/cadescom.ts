import {
    CAPICOM_CERTIFICATE_INCLUDE_OPTION,
    CAPICOM_ENCODING_TYPE,
    CAPICOM_HASH_ALGORITHM,
    ICertificate,
    ICertificates,
    IOID,
    ISigners,
    IStore,
} from "../capicom";
import {
    CADESCOM_ATTRIBUTE,
    CADESCOM_CADES_TYPE,
    CADESCOM_CONTENT_ENCODING_TYPE,
    CADESCOM_DISPLAY_DATA,
    CADESCOM_ENCRYPTION_ALGORITHM,
    CADESCOM_HASH_ALGORITHM,
    CADESCOM_XML_SIGNATURE_TYPE,
} from "./cadescom-enums";

//to make interface differ
declare const privateKeySymbol: unique symbol;

export interface IPrivateKey {
    [privateKeySymbol]: unknown;
}

export interface ICPCertificate extends ICertificate {
    readonly PrivateKey: IPrivateKey;
}

export interface ICPRecipients {
    readonly Count: number;

    Add(certificate: ICertificate): void;
}

export interface ICPEnvelopedData {
    Encrypt(encodingType?: CAPICOM_ENCODING_TYPE): string;

    Decrypt(message: string): void;

    Algorithm: CADESCOM_ENCRYPTION_ALGORITHM;
    Content: string;
    readonly Recipients: ICPRecipients;
}

export interface ICPSigner {
    Certificate: ICertificate;
    CheckCertificate: boolean;

    KeyPin: string;
    Options: CAPICOM_CERTIFICATE_INCLUDE_OPTION;
    readonly SignatureTimeStampTime: string;
    readonly SigningTime: string;
    TSAAddress: string;

    Display(hwndParent?: number, title?: string): void;

    Load(fileName: string, password?: string): void;
}

export interface ICadesSignedData {
    readonly Certificates: ICertificates;
    Content: string;
    ContentEncoding: CADESCOM_CONTENT_ENCODING_TYPE;

    DisplayData: CADESCOM_DISPLAY_DATA;

    Display(hwndParent?: number, title?: string): void;

    EnhanceCades(cadesType?: CADESCOM_CADES_TYPE, TSAAddress?: string, encodingType?: CAPICOM_ENCODING_TYPE): string;

    SignCades(
        signer?: ICPSigner, CadesType?: CADESCOM_CADES_TYPE, bDetached?: boolean,
        EncodingType?: CAPICOM_ENCODING_TYPE,
    ): string;

    VerifyCades(SignedMessage: string, CadesType?: CADESCOM_CADES_TYPE, bDetached?: boolean): void;

    SignHash(
        hashedData: ICPHashedData, signer?: ICPSigner, CadesType?: CADESCOM_CADES_TYPE,
        encodingType?: CAPICOM_ENCODING_TYPE,
    ): string;

    VerifyHash(hashedData: ICPHashedData, message: string, CadesType?: CADESCOM_CADES_TYPE): boolean;
}

export interface IVersion {
    readonly BuildVersion: number;
    readonly MajorVersion: number;
    readonly MinorVersion: number;
    readonly toStringDefault: string;

    toString(): string;
}

export interface IAbout {
    readonly BuildVersion: number;
    readonly MajorVersion: number;
    readonly MinorVersion: number;
    readonly PluginVersion: IVersion;
    readonly Version: string;

    CSPName(ProviderType?: number): string;

    CSPVersion(ProviderName?: string, ProviderType?: number): IVersion;

    ProviderVersion(ProviderName?: string, ProviderType?: number): string;

    toString(): string;
}

export interface ICPSigners {
    readonly Count: number;

    Item(index: number): ICPSigner;
}

export interface ISignedXML {
    Content: string;
    DigestMethod: string;
    SignatureMethod: string;
    SignatureType: CADESCOM_XML_SIGNATURE_TYPE;
    readonly Signers: ISigners;

    Sign(signer?: ICPSigner, XPath?: string): string;

    Verify(SignedMessage: string, XPath?: string): void;
}

export interface ICPHashedData<T extends number = CAPICOM_HASH_ALGORITHM> {
    Algorithm: T;
    DataEncoding: CADESCOM_CONTENT_ENCODING_TYPE;
    Value: string;

    Hash(newVal: string): void;

    SetHashValue(newVal: string): void;
}

export interface ICPHashedData2 extends ICPHashedData<CAPICOM_HASH_ALGORITHM | CADESCOM_HASH_ALGORITHM> {
}

export interface ICPAttribute {
    Name: CADESCOM_ATTRIBUTE;
    OID: IOID;
    Value: any;
    ValueEncoding: CAPICOM_ENCODING_TYPE;
}

export interface IRawSignature {
    SignHash(hash: ICPHashedData, certificate?: string): string;

    VerifyHash(hash: ICPHashedData, certificate: ICertificate, signature: string): void;
}


export interface ICPCertificates<T = ICPCertificate> extends ICertificates<T> {
}

export interface ICPStore<T = ICPCertificates> extends IStore<T> {
}
