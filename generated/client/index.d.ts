
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model CapitalLedger
 * 
 */
export type CapitalLedger = $Result.DefaultSelection<Prisma.$CapitalLedgerPayload>
/**
 * Model LoanAccount
 * 
 */
export type LoanAccount = $Result.DefaultSelection<Prisma.$LoanAccountPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  SUPERADMIN: 'SUPERADMIN',
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const StatusTransaction: {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type StatusTransaction = (typeof StatusTransaction)[keyof typeof StatusTransaction]


export const StatusLoan: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  CANCELED: 'CANCELED',
  SETTLED: 'SETTLED'
};

export type StatusLoan = (typeof StatusLoan)[keyof typeof StatusLoan]


export const TypeCapitalLedger: {
  INJECTION: 'INJECTION',
  WITHDRAWAL: 'WITHDRAWAL',
  LOAN: 'LOAN',
  OPS: 'OPS'
};

export type TypeCapitalLedger = (typeof TypeCapitalLedger)[keyof typeof TypeCapitalLedger]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type StatusTransaction = $Enums.StatusTransaction

export const StatusTransaction: typeof $Enums.StatusTransaction

export type StatusLoan = $Enums.StatusLoan

export const StatusLoan: typeof $Enums.StatusLoan

export type TypeCapitalLedger = $Enums.TypeCapitalLedger

export const TypeCapitalLedger: typeof $Enums.TypeCapitalLedger

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.capitalLedger`: Exposes CRUD operations for the **CapitalLedger** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CapitalLedgers
    * const capitalLedgers = await prisma.capitalLedger.findMany()
    * ```
    */
  get capitalLedger(): Prisma.CapitalLedgerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loanAccount`: Exposes CRUD operations for the **LoanAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoanAccounts
    * const loanAccounts = await prisma.loanAccount.findMany()
    * ```
    */
  get loanAccount(): Prisma.LoanAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Customer: 'Customer',
    Product: 'Product',
    CapitalLedger: 'CapitalLedger',
    LoanAccount: 'LoanAccount',
    Transaction: 'Transaction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "customer" | "product" | "capitalLedger" | "loanAccount" | "transaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      CapitalLedger: {
        payload: Prisma.$CapitalLedgerPayload<ExtArgs>
        fields: Prisma.CapitalLedgerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CapitalLedgerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapitalLedgerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CapitalLedgerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapitalLedgerPayload>
          }
          findFirst: {
            args: Prisma.CapitalLedgerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapitalLedgerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CapitalLedgerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapitalLedgerPayload>
          }
          findMany: {
            args: Prisma.CapitalLedgerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapitalLedgerPayload>[]
          }
          create: {
            args: Prisma.CapitalLedgerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapitalLedgerPayload>
          }
          createMany: {
            args: Prisma.CapitalLedgerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CapitalLedgerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapitalLedgerPayload>[]
          }
          delete: {
            args: Prisma.CapitalLedgerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapitalLedgerPayload>
          }
          update: {
            args: Prisma.CapitalLedgerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapitalLedgerPayload>
          }
          deleteMany: {
            args: Prisma.CapitalLedgerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CapitalLedgerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CapitalLedgerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapitalLedgerPayload>[]
          }
          upsert: {
            args: Prisma.CapitalLedgerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapitalLedgerPayload>
          }
          aggregate: {
            args: Prisma.CapitalLedgerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCapitalLedger>
          }
          groupBy: {
            args: Prisma.CapitalLedgerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CapitalLedgerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CapitalLedgerCountArgs<ExtArgs>
            result: $Utils.Optional<CapitalLedgerCountAggregateOutputType> | number
          }
        }
      }
      LoanAccount: {
        payload: Prisma.$LoanAccountPayload<ExtArgs>
        fields: Prisma.LoanAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoanAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoanAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanAccountPayload>
          }
          findFirst: {
            args: Prisma.LoanAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoanAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanAccountPayload>
          }
          findMany: {
            args: Prisma.LoanAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanAccountPayload>[]
          }
          create: {
            args: Prisma.LoanAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanAccountPayload>
          }
          createMany: {
            args: Prisma.LoanAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoanAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanAccountPayload>[]
          }
          delete: {
            args: Prisma.LoanAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanAccountPayload>
          }
          update: {
            args: Prisma.LoanAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanAccountPayload>
          }
          deleteMany: {
            args: Prisma.LoanAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoanAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoanAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanAccountPayload>[]
          }
          upsert: {
            args: Prisma.LoanAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanAccountPayload>
          }
          aggregate: {
            args: Prisma.LoanAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoanAccount>
          }
          groupBy: {
            args: Prisma.LoanAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoanAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoanAccountCountArgs<ExtArgs>
            result: $Utils.Optional<LoanAccountCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    customer?: CustomerOmit
    product?: ProductOmit
    capitalLedger?: CapitalLedgerOmit
    loanAccount?: LoanAccountOmit
    transaction?: TransactionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    customers: number
    products: number
    capital_ledgers: number
    loan_accounts: number
    transactions_processed: number
    transactions_approved: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customers?: boolean | UserCountOutputTypeCountCustomersArgs
    products?: boolean | UserCountOutputTypeCountProductsArgs
    capital_ledgers?: boolean | UserCountOutputTypeCountCapital_ledgersArgs
    loan_accounts?: boolean | UserCountOutputTypeCountLoan_accountsArgs
    transactions_processed?: boolean | UserCountOutputTypeCountTransactions_processedArgs
    transactions_approved?: boolean | UserCountOutputTypeCountTransactions_approvedArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCustomersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCapital_ledgersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CapitalLedgerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLoan_accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanAccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactions_processedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactions_approvedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    loan_accounts: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan_accounts?: boolean | CustomerCountOutputTypeCountLoan_accountsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountLoan_accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanAccountWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    loan_accounts: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan_accounts?: boolean | ProductCountOutputTypeCountLoan_accountsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountLoan_accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanAccountWhereInput
  }


  /**
   * Count Type LoanAccountCountOutputType
   */

  export type LoanAccountCountOutputType = {
    transactions: number
  }

  export type LoanAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | LoanAccountCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * LoanAccountCountOutputType without action
   */
  export type LoanAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccountCountOutputType
     */
    select?: LoanAccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoanAccountCountOutputType without action
   */
  export type LoanAccountCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    full_name: string | null
    username: string | null
    email: string | null
    password_hash: string | null
    phone_number: string | null
    birthday: Date | null
    address: string | null
    regency: string | null
    province: string | null
    zip_code: string | null
    images: string | null
    access_token: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    full_name: string | null
    username: string | null
    email: string | null
    password_hash: string | null
    phone_number: string | null
    birthday: Date | null
    address: string | null
    regency: string | null
    province: string | null
    zip_code: string | null
    images: string | null
    access_token: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    full_name: number
    username: number
    email: number
    password_hash: number
    phone_number: number
    birthday: number
    address: number
    regency: number
    province: number
    zip_code: number
    images: number
    access_token: number
    role: number
    isActive: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    full_name?: true
    username?: true
    email?: true
    password_hash?: true
    phone_number?: true
    birthday?: true
    address?: true
    regency?: true
    province?: true
    zip_code?: true
    images?: true
    access_token?: true
    role?: true
    isActive?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    full_name?: true
    username?: true
    email?: true
    password_hash?: true
    phone_number?: true
    birthday?: true
    address?: true
    regency?: true
    province?: true
    zip_code?: true
    images?: true
    access_token?: true
    role?: true
    isActive?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    full_name?: true
    username?: true
    email?: true
    password_hash?: true
    phone_number?: true
    birthday?: true
    address?: true
    regency?: true
    province?: true
    zip_code?: true
    images?: true
    access_token?: true
    role?: true
    isActive?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number: string | null
    birthday: Date | null
    address: string | null
    regency: string | null
    province: string | null
    zip_code: string | null
    images: string | null
    access_token: string | null
    role: $Enums.UserRole
    isActive: boolean
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    full_name?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    phone_number?: boolean
    birthday?: boolean
    address?: boolean
    regency?: boolean
    province?: boolean
    zip_code?: boolean
    images?: boolean
    access_token?: boolean
    role?: boolean
    isActive?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    customers?: boolean | User$customersArgs<ExtArgs>
    products?: boolean | User$productsArgs<ExtArgs>
    capital_ledgers?: boolean | User$capital_ledgersArgs<ExtArgs>
    loan_accounts?: boolean | User$loan_accountsArgs<ExtArgs>
    transactions_processed?: boolean | User$transactions_processedArgs<ExtArgs>
    transactions_approved?: boolean | User$transactions_approvedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    full_name?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    phone_number?: boolean
    birthday?: boolean
    address?: boolean
    regency?: boolean
    province?: boolean
    zip_code?: boolean
    images?: boolean
    access_token?: boolean
    role?: boolean
    isActive?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    full_name?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    phone_number?: boolean
    birthday?: boolean
    address?: boolean
    regency?: boolean
    province?: boolean
    zip_code?: boolean
    images?: boolean
    access_token?: boolean
    role?: boolean
    isActive?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    full_name?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    phone_number?: boolean
    birthday?: boolean
    address?: boolean
    regency?: boolean
    province?: boolean
    zip_code?: boolean
    images?: boolean
    access_token?: boolean
    role?: boolean
    isActive?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "full_name" | "username" | "email" | "password_hash" | "phone_number" | "birthday" | "address" | "regency" | "province" | "zip_code" | "images" | "access_token" | "role" | "isActive" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customers?: boolean | User$customersArgs<ExtArgs>
    products?: boolean | User$productsArgs<ExtArgs>
    capital_ledgers?: boolean | User$capital_ledgersArgs<ExtArgs>
    loan_accounts?: boolean | User$loan_accountsArgs<ExtArgs>
    transactions_processed?: boolean | User$transactions_processedArgs<ExtArgs>
    transactions_approved?: boolean | User$transactions_approvedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      customers: Prisma.$CustomerPayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
      capital_ledgers: Prisma.$CapitalLedgerPayload<ExtArgs>[]
      loan_accounts: Prisma.$LoanAccountPayload<ExtArgs>[]
      transactions_processed: Prisma.$TransactionPayload<ExtArgs>[]
      transactions_approved: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      full_name: string
      username: string
      email: string
      password_hash: string
      phone_number: string | null
      birthday: Date | null
      address: string | null
      regency: string | null
      province: string | null
      zip_code: string | null
      images: string | null
      access_token: string | null
      role: $Enums.UserRole
      isActive: boolean
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customers<T extends User$customersArgs<ExtArgs> = {}>(args?: Subset<T, User$customersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    products<T extends User$productsArgs<ExtArgs> = {}>(args?: Subset<T, User$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    capital_ledgers<T extends User$capital_ledgersArgs<ExtArgs> = {}>(args?: Subset<T, User$capital_ledgersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CapitalLedgerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    loan_accounts<T extends User$loan_accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$loan_accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions_processed<T extends User$transactions_processedArgs<ExtArgs> = {}>(args?: Subset<T, User$transactions_processedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions_approved<T extends User$transactions_approvedArgs<ExtArgs> = {}>(args?: Subset<T, User$transactions_approvedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly full_name: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly phone_number: FieldRef<"User", 'String'>
    readonly birthday: FieldRef<"User", 'DateTime'>
    readonly address: FieldRef<"User", 'String'>
    readonly regency: FieldRef<"User", 'String'>
    readonly province: FieldRef<"User", 'String'>
    readonly zip_code: FieldRef<"User", 'String'>
    readonly images: FieldRef<"User", 'String'>
    readonly access_token: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
    readonly deleted_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.customers
   */
  export type User$customersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    cursor?: CustomerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * User.products
   */
  export type User$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * User.capital_ledgers
   */
  export type User$capital_ledgersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerInclude<ExtArgs> | null
    where?: CapitalLedgerWhereInput
    orderBy?: CapitalLedgerOrderByWithRelationInput | CapitalLedgerOrderByWithRelationInput[]
    cursor?: CapitalLedgerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CapitalLedgerScalarFieldEnum | CapitalLedgerScalarFieldEnum[]
  }

  /**
   * User.loan_accounts
   */
  export type User$loan_accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
    where?: LoanAccountWhereInput
    orderBy?: LoanAccountOrderByWithRelationInput | LoanAccountOrderByWithRelationInput[]
    cursor?: LoanAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanAccountScalarFieldEnum | LoanAccountScalarFieldEnum[]
  }

  /**
   * User.transactions_processed
   */
  export type User$transactions_processedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User.transactions_approved
   */
  export type User$transactions_approvedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    full_name: string | null
    phone_number: string | null
    address: string | null
    regency: string | null
    province: string | null
    zip_code: string | null
    job: string | null
    isActive: boolean | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    full_name: string | null
    phone_number: string | null
    address: string | null
    regency: string | null
    province: string | null
    zip_code: string | null
    job: string | null
    isActive: boolean | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    user_id: number
    full_name: number
    phone_number: number
    address: number
    regency: number
    province: number
    zip_code: number
    job: number
    isActive: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    user_id?: true
    full_name?: true
    phone_number?: true
    address?: true
    regency?: true
    province?: true
    zip_code?: true
    job?: true
    isActive?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    user_id?: true
    full_name?: true
    phone_number?: true
    address?: true
    regency?: true
    province?: true
    zip_code?: true
    job?: true
    isActive?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    user_id?: true
    full_name?: true
    phone_number?: true
    address?: true
    regency?: true
    province?: true
    zip_code?: true
    job?: true
    isActive?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    user_id: string
    full_name: string
    phone_number: string | null
    address: string | null
    regency: string | null
    province: string | null
    zip_code: string | null
    job: string | null
    isActive: boolean
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    full_name?: boolean
    phone_number?: boolean
    address?: boolean
    regency?: boolean
    province?: boolean
    zip_code?: boolean
    job?: boolean
    isActive?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    loan_accounts?: boolean | Customer$loan_accountsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    full_name?: boolean
    phone_number?: boolean
    address?: boolean
    regency?: boolean
    province?: boolean
    zip_code?: boolean
    job?: boolean
    isActive?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    full_name?: boolean
    phone_number?: boolean
    address?: boolean
    regency?: boolean
    province?: boolean
    zip_code?: boolean
    job?: boolean
    isActive?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    user_id?: boolean
    full_name?: boolean
    phone_number?: boolean
    address?: boolean
    regency?: boolean
    province?: boolean
    zip_code?: boolean
    job?: boolean
    isActive?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "full_name" | "phone_number" | "address" | "regency" | "province" | "zip_code" | "job" | "isActive" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan_accounts?: boolean | Customer$loan_accountsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      loan_accounts: Prisma.$LoanAccountPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      full_name: string
      phone_number: string | null
      address: string | null
      regency: string | null
      province: string | null
      zip_code: string | null
      job: string | null
      isActive: boolean
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loan_accounts<T extends Customer$loan_accountsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$loan_accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly user_id: FieldRef<"Customer", 'String'>
    readonly full_name: FieldRef<"Customer", 'String'>
    readonly phone_number: FieldRef<"Customer", 'String'>
    readonly address: FieldRef<"Customer", 'String'>
    readonly regency: FieldRef<"Customer", 'String'>
    readonly province: FieldRef<"Customer", 'String'>
    readonly zip_code: FieldRef<"Customer", 'String'>
    readonly job: FieldRef<"Customer", 'String'>
    readonly isActive: FieldRef<"Customer", 'Boolean'>
    readonly created_at: FieldRef<"Customer", 'DateTime'>
    readonly updated_at: FieldRef<"Customer", 'DateTime'>
    readonly deleted_at: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.loan_accounts
   */
  export type Customer$loan_accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
    where?: LoanAccountWhereInput
    orderBy?: LoanAccountOrderByWithRelationInput | LoanAccountOrderByWithRelationInput[]
    cursor?: LoanAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanAccountScalarFieldEnum | LoanAccountScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: Decimal | null
  }

  export type ProductSumAggregateOutputType = {
    price: Decimal | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    product_name: string | null
    slug: string | null
    description: string | null
    price: Decimal | null
    isActive: boolean | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    product_name: string | null
    slug: string | null
    description: string | null
    price: Decimal | null
    isActive: boolean | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    user_id: number
    product_name: number
    slug: number
    description: number
    price: number
    isActive: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    user_id?: true
    product_name?: true
    slug?: true
    description?: true
    price?: true
    isActive?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    user_id?: true
    product_name?: true
    slug?: true
    description?: true
    price?: true
    isActive?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    user_id?: true
    product_name?: true
    slug?: true
    description?: true
    price?: true
    isActive?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    user_id: string
    product_name: string
    slug: string | null
    description: string
    price: Decimal
    isActive: boolean
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    product_name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    isActive?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    loan_accounts?: boolean | Product$loan_accountsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    product_name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    isActive?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    product_name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    isActive?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    user_id?: boolean
    product_name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    isActive?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "product_name" | "slug" | "description" | "price" | "isActive" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan_accounts?: boolean | Product$loan_accountsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      loan_accounts: Prisma.$LoanAccountPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      product_name: string
      slug: string | null
      description: string
      price: Prisma.Decimal
      isActive: boolean
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loan_accounts<T extends Product$loan_accountsArgs<ExtArgs> = {}>(args?: Subset<T, Product$loan_accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly user_id: FieldRef<"Product", 'String'>
    readonly product_name: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Decimal'>
    readonly isActive: FieldRef<"Product", 'Boolean'>
    readonly created_at: FieldRef<"Product", 'DateTime'>
    readonly updated_at: FieldRef<"Product", 'DateTime'>
    readonly deleted_at: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.loan_accounts
   */
  export type Product$loan_accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
    where?: LoanAccountWhereInput
    orderBy?: LoanAccountOrderByWithRelationInput | LoanAccountOrderByWithRelationInput[]
    cursor?: LoanAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanAccountScalarFieldEnum | LoanAccountScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model CapitalLedger
   */

  export type AggregateCapitalLedger = {
    _count: CapitalLedgerCountAggregateOutputType | null
    _avg: CapitalLedgerAvgAggregateOutputType | null
    _sum: CapitalLedgerSumAggregateOutputType | null
    _min: CapitalLedgerMinAggregateOutputType | null
    _max: CapitalLedgerMaxAggregateOutputType | null
  }

  export type CapitalLedgerAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type CapitalLedgerSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type CapitalLedgerMinAggregateOutputType = {
    id: string | null
    created_by_id: string | null
    amount: Decimal | null
    type: $Enums.TypeCapitalLedger | null
    description: string | null
    refrence_number: string | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type CapitalLedgerMaxAggregateOutputType = {
    id: string | null
    created_by_id: string | null
    amount: Decimal | null
    type: $Enums.TypeCapitalLedger | null
    description: string | null
    refrence_number: string | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type CapitalLedgerCountAggregateOutputType = {
    id: number
    created_by_id: number
    amount: number
    type: number
    description: number
    refrence_number: number
    notes: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type CapitalLedgerAvgAggregateInputType = {
    amount?: true
  }

  export type CapitalLedgerSumAggregateInputType = {
    amount?: true
  }

  export type CapitalLedgerMinAggregateInputType = {
    id?: true
    created_by_id?: true
    amount?: true
    type?: true
    description?: true
    refrence_number?: true
    notes?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type CapitalLedgerMaxAggregateInputType = {
    id?: true
    created_by_id?: true
    amount?: true
    type?: true
    description?: true
    refrence_number?: true
    notes?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type CapitalLedgerCountAggregateInputType = {
    id?: true
    created_by_id?: true
    amount?: true
    type?: true
    description?: true
    refrence_number?: true
    notes?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type CapitalLedgerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CapitalLedger to aggregate.
     */
    where?: CapitalLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CapitalLedgers to fetch.
     */
    orderBy?: CapitalLedgerOrderByWithRelationInput | CapitalLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CapitalLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CapitalLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CapitalLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CapitalLedgers
    **/
    _count?: true | CapitalLedgerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CapitalLedgerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CapitalLedgerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CapitalLedgerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CapitalLedgerMaxAggregateInputType
  }

  export type GetCapitalLedgerAggregateType<T extends CapitalLedgerAggregateArgs> = {
        [P in keyof T & keyof AggregateCapitalLedger]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCapitalLedger[P]>
      : GetScalarType<T[P], AggregateCapitalLedger[P]>
  }




  export type CapitalLedgerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CapitalLedgerWhereInput
    orderBy?: CapitalLedgerOrderByWithAggregationInput | CapitalLedgerOrderByWithAggregationInput[]
    by: CapitalLedgerScalarFieldEnum[] | CapitalLedgerScalarFieldEnum
    having?: CapitalLedgerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CapitalLedgerCountAggregateInputType | true
    _avg?: CapitalLedgerAvgAggregateInputType
    _sum?: CapitalLedgerSumAggregateInputType
    _min?: CapitalLedgerMinAggregateInputType
    _max?: CapitalLedgerMaxAggregateInputType
  }

  export type CapitalLedgerGroupByOutputType = {
    id: string
    created_by_id: string
    amount: Decimal
    type: $Enums.TypeCapitalLedger
    description: string
    refrence_number: string | null
    notes: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: CapitalLedgerCountAggregateOutputType | null
    _avg: CapitalLedgerAvgAggregateOutputType | null
    _sum: CapitalLedgerSumAggregateOutputType | null
    _min: CapitalLedgerMinAggregateOutputType | null
    _max: CapitalLedgerMaxAggregateOutputType | null
  }

  type GetCapitalLedgerGroupByPayload<T extends CapitalLedgerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CapitalLedgerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CapitalLedgerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CapitalLedgerGroupByOutputType[P]>
            : GetScalarType<T[P], CapitalLedgerGroupByOutputType[P]>
        }
      >
    >


  export type CapitalLedgerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_by_id?: boolean
    amount?: boolean
    type?: boolean
    description?: boolean
    refrence_number?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["capitalLedger"]>

  export type CapitalLedgerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_by_id?: boolean
    amount?: boolean
    type?: boolean
    description?: boolean
    refrence_number?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["capitalLedger"]>

  export type CapitalLedgerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_by_id?: boolean
    amount?: boolean
    type?: boolean
    description?: boolean
    refrence_number?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["capitalLedger"]>

  export type CapitalLedgerSelectScalar = {
    id?: boolean
    created_by_id?: boolean
    amount?: boolean
    type?: boolean
    description?: boolean
    refrence_number?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type CapitalLedgerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_by_id" | "amount" | "type" | "description" | "refrence_number" | "notes" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["capitalLedger"]>
  export type CapitalLedgerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CapitalLedgerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CapitalLedgerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CapitalLedgerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CapitalLedger"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_by_id: string
      amount: Prisma.Decimal
      type: $Enums.TypeCapitalLedger
      description: string
      refrence_number: string | null
      notes: string | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["capitalLedger"]>
    composites: {}
  }

  type CapitalLedgerGetPayload<S extends boolean | null | undefined | CapitalLedgerDefaultArgs> = $Result.GetResult<Prisma.$CapitalLedgerPayload, S>

  type CapitalLedgerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CapitalLedgerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CapitalLedgerCountAggregateInputType | true
    }

  export interface CapitalLedgerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CapitalLedger'], meta: { name: 'CapitalLedger' } }
    /**
     * Find zero or one CapitalLedger that matches the filter.
     * @param {CapitalLedgerFindUniqueArgs} args - Arguments to find a CapitalLedger
     * @example
     * // Get one CapitalLedger
     * const capitalLedger = await prisma.capitalLedger.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CapitalLedgerFindUniqueArgs>(args: SelectSubset<T, CapitalLedgerFindUniqueArgs<ExtArgs>>): Prisma__CapitalLedgerClient<$Result.GetResult<Prisma.$CapitalLedgerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CapitalLedger that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CapitalLedgerFindUniqueOrThrowArgs} args - Arguments to find a CapitalLedger
     * @example
     * // Get one CapitalLedger
     * const capitalLedger = await prisma.capitalLedger.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CapitalLedgerFindUniqueOrThrowArgs>(args: SelectSubset<T, CapitalLedgerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CapitalLedgerClient<$Result.GetResult<Prisma.$CapitalLedgerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CapitalLedger that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapitalLedgerFindFirstArgs} args - Arguments to find a CapitalLedger
     * @example
     * // Get one CapitalLedger
     * const capitalLedger = await prisma.capitalLedger.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CapitalLedgerFindFirstArgs>(args?: SelectSubset<T, CapitalLedgerFindFirstArgs<ExtArgs>>): Prisma__CapitalLedgerClient<$Result.GetResult<Prisma.$CapitalLedgerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CapitalLedger that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapitalLedgerFindFirstOrThrowArgs} args - Arguments to find a CapitalLedger
     * @example
     * // Get one CapitalLedger
     * const capitalLedger = await prisma.capitalLedger.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CapitalLedgerFindFirstOrThrowArgs>(args?: SelectSubset<T, CapitalLedgerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CapitalLedgerClient<$Result.GetResult<Prisma.$CapitalLedgerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CapitalLedgers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapitalLedgerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CapitalLedgers
     * const capitalLedgers = await prisma.capitalLedger.findMany()
     * 
     * // Get first 10 CapitalLedgers
     * const capitalLedgers = await prisma.capitalLedger.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const capitalLedgerWithIdOnly = await prisma.capitalLedger.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CapitalLedgerFindManyArgs>(args?: SelectSubset<T, CapitalLedgerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CapitalLedgerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CapitalLedger.
     * @param {CapitalLedgerCreateArgs} args - Arguments to create a CapitalLedger.
     * @example
     * // Create one CapitalLedger
     * const CapitalLedger = await prisma.capitalLedger.create({
     *   data: {
     *     // ... data to create a CapitalLedger
     *   }
     * })
     * 
     */
    create<T extends CapitalLedgerCreateArgs>(args: SelectSubset<T, CapitalLedgerCreateArgs<ExtArgs>>): Prisma__CapitalLedgerClient<$Result.GetResult<Prisma.$CapitalLedgerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CapitalLedgers.
     * @param {CapitalLedgerCreateManyArgs} args - Arguments to create many CapitalLedgers.
     * @example
     * // Create many CapitalLedgers
     * const capitalLedger = await prisma.capitalLedger.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CapitalLedgerCreateManyArgs>(args?: SelectSubset<T, CapitalLedgerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CapitalLedgers and returns the data saved in the database.
     * @param {CapitalLedgerCreateManyAndReturnArgs} args - Arguments to create many CapitalLedgers.
     * @example
     * // Create many CapitalLedgers
     * const capitalLedger = await prisma.capitalLedger.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CapitalLedgers and only return the `id`
     * const capitalLedgerWithIdOnly = await prisma.capitalLedger.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CapitalLedgerCreateManyAndReturnArgs>(args?: SelectSubset<T, CapitalLedgerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CapitalLedgerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CapitalLedger.
     * @param {CapitalLedgerDeleteArgs} args - Arguments to delete one CapitalLedger.
     * @example
     * // Delete one CapitalLedger
     * const CapitalLedger = await prisma.capitalLedger.delete({
     *   where: {
     *     // ... filter to delete one CapitalLedger
     *   }
     * })
     * 
     */
    delete<T extends CapitalLedgerDeleteArgs>(args: SelectSubset<T, CapitalLedgerDeleteArgs<ExtArgs>>): Prisma__CapitalLedgerClient<$Result.GetResult<Prisma.$CapitalLedgerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CapitalLedger.
     * @param {CapitalLedgerUpdateArgs} args - Arguments to update one CapitalLedger.
     * @example
     * // Update one CapitalLedger
     * const capitalLedger = await prisma.capitalLedger.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CapitalLedgerUpdateArgs>(args: SelectSubset<T, CapitalLedgerUpdateArgs<ExtArgs>>): Prisma__CapitalLedgerClient<$Result.GetResult<Prisma.$CapitalLedgerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CapitalLedgers.
     * @param {CapitalLedgerDeleteManyArgs} args - Arguments to filter CapitalLedgers to delete.
     * @example
     * // Delete a few CapitalLedgers
     * const { count } = await prisma.capitalLedger.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CapitalLedgerDeleteManyArgs>(args?: SelectSubset<T, CapitalLedgerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CapitalLedgers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapitalLedgerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CapitalLedgers
     * const capitalLedger = await prisma.capitalLedger.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CapitalLedgerUpdateManyArgs>(args: SelectSubset<T, CapitalLedgerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CapitalLedgers and returns the data updated in the database.
     * @param {CapitalLedgerUpdateManyAndReturnArgs} args - Arguments to update many CapitalLedgers.
     * @example
     * // Update many CapitalLedgers
     * const capitalLedger = await prisma.capitalLedger.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CapitalLedgers and only return the `id`
     * const capitalLedgerWithIdOnly = await prisma.capitalLedger.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CapitalLedgerUpdateManyAndReturnArgs>(args: SelectSubset<T, CapitalLedgerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CapitalLedgerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CapitalLedger.
     * @param {CapitalLedgerUpsertArgs} args - Arguments to update or create a CapitalLedger.
     * @example
     * // Update or create a CapitalLedger
     * const capitalLedger = await prisma.capitalLedger.upsert({
     *   create: {
     *     // ... data to create a CapitalLedger
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CapitalLedger we want to update
     *   }
     * })
     */
    upsert<T extends CapitalLedgerUpsertArgs>(args: SelectSubset<T, CapitalLedgerUpsertArgs<ExtArgs>>): Prisma__CapitalLedgerClient<$Result.GetResult<Prisma.$CapitalLedgerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CapitalLedgers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapitalLedgerCountArgs} args - Arguments to filter CapitalLedgers to count.
     * @example
     * // Count the number of CapitalLedgers
     * const count = await prisma.capitalLedger.count({
     *   where: {
     *     // ... the filter for the CapitalLedgers we want to count
     *   }
     * })
    **/
    count<T extends CapitalLedgerCountArgs>(
      args?: Subset<T, CapitalLedgerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CapitalLedgerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CapitalLedger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapitalLedgerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CapitalLedgerAggregateArgs>(args: Subset<T, CapitalLedgerAggregateArgs>): Prisma.PrismaPromise<GetCapitalLedgerAggregateType<T>>

    /**
     * Group by CapitalLedger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapitalLedgerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CapitalLedgerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CapitalLedgerGroupByArgs['orderBy'] }
        : { orderBy?: CapitalLedgerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CapitalLedgerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCapitalLedgerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CapitalLedger model
   */
  readonly fields: CapitalLedgerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CapitalLedger.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CapitalLedgerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CapitalLedger model
   */
  interface CapitalLedgerFieldRefs {
    readonly id: FieldRef<"CapitalLedger", 'String'>
    readonly created_by_id: FieldRef<"CapitalLedger", 'String'>
    readonly amount: FieldRef<"CapitalLedger", 'Decimal'>
    readonly type: FieldRef<"CapitalLedger", 'TypeCapitalLedger'>
    readonly description: FieldRef<"CapitalLedger", 'String'>
    readonly refrence_number: FieldRef<"CapitalLedger", 'String'>
    readonly notes: FieldRef<"CapitalLedger", 'String'>
    readonly created_at: FieldRef<"CapitalLedger", 'DateTime'>
    readonly updated_at: FieldRef<"CapitalLedger", 'DateTime'>
    readonly deleted_at: FieldRef<"CapitalLedger", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CapitalLedger findUnique
   */
  export type CapitalLedgerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerInclude<ExtArgs> | null
    /**
     * Filter, which CapitalLedger to fetch.
     */
    where: CapitalLedgerWhereUniqueInput
  }

  /**
   * CapitalLedger findUniqueOrThrow
   */
  export type CapitalLedgerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerInclude<ExtArgs> | null
    /**
     * Filter, which CapitalLedger to fetch.
     */
    where: CapitalLedgerWhereUniqueInput
  }

  /**
   * CapitalLedger findFirst
   */
  export type CapitalLedgerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerInclude<ExtArgs> | null
    /**
     * Filter, which CapitalLedger to fetch.
     */
    where?: CapitalLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CapitalLedgers to fetch.
     */
    orderBy?: CapitalLedgerOrderByWithRelationInput | CapitalLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CapitalLedgers.
     */
    cursor?: CapitalLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CapitalLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CapitalLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CapitalLedgers.
     */
    distinct?: CapitalLedgerScalarFieldEnum | CapitalLedgerScalarFieldEnum[]
  }

  /**
   * CapitalLedger findFirstOrThrow
   */
  export type CapitalLedgerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerInclude<ExtArgs> | null
    /**
     * Filter, which CapitalLedger to fetch.
     */
    where?: CapitalLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CapitalLedgers to fetch.
     */
    orderBy?: CapitalLedgerOrderByWithRelationInput | CapitalLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CapitalLedgers.
     */
    cursor?: CapitalLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CapitalLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CapitalLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CapitalLedgers.
     */
    distinct?: CapitalLedgerScalarFieldEnum | CapitalLedgerScalarFieldEnum[]
  }

  /**
   * CapitalLedger findMany
   */
  export type CapitalLedgerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerInclude<ExtArgs> | null
    /**
     * Filter, which CapitalLedgers to fetch.
     */
    where?: CapitalLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CapitalLedgers to fetch.
     */
    orderBy?: CapitalLedgerOrderByWithRelationInput | CapitalLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CapitalLedgers.
     */
    cursor?: CapitalLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CapitalLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CapitalLedgers.
     */
    skip?: number
    distinct?: CapitalLedgerScalarFieldEnum | CapitalLedgerScalarFieldEnum[]
  }

  /**
   * CapitalLedger create
   */
  export type CapitalLedgerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerInclude<ExtArgs> | null
    /**
     * The data needed to create a CapitalLedger.
     */
    data: XOR<CapitalLedgerCreateInput, CapitalLedgerUncheckedCreateInput>
  }

  /**
   * CapitalLedger createMany
   */
  export type CapitalLedgerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CapitalLedgers.
     */
    data: CapitalLedgerCreateManyInput | CapitalLedgerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CapitalLedger createManyAndReturn
   */
  export type CapitalLedgerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * The data used to create many CapitalLedgers.
     */
    data: CapitalLedgerCreateManyInput | CapitalLedgerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CapitalLedger update
   */
  export type CapitalLedgerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerInclude<ExtArgs> | null
    /**
     * The data needed to update a CapitalLedger.
     */
    data: XOR<CapitalLedgerUpdateInput, CapitalLedgerUncheckedUpdateInput>
    /**
     * Choose, which CapitalLedger to update.
     */
    where: CapitalLedgerWhereUniqueInput
  }

  /**
   * CapitalLedger updateMany
   */
  export type CapitalLedgerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CapitalLedgers.
     */
    data: XOR<CapitalLedgerUpdateManyMutationInput, CapitalLedgerUncheckedUpdateManyInput>
    /**
     * Filter which CapitalLedgers to update
     */
    where?: CapitalLedgerWhereInput
    /**
     * Limit how many CapitalLedgers to update.
     */
    limit?: number
  }

  /**
   * CapitalLedger updateManyAndReturn
   */
  export type CapitalLedgerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * The data used to update CapitalLedgers.
     */
    data: XOR<CapitalLedgerUpdateManyMutationInput, CapitalLedgerUncheckedUpdateManyInput>
    /**
     * Filter which CapitalLedgers to update
     */
    where?: CapitalLedgerWhereInput
    /**
     * Limit how many CapitalLedgers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CapitalLedger upsert
   */
  export type CapitalLedgerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerInclude<ExtArgs> | null
    /**
     * The filter to search for the CapitalLedger to update in case it exists.
     */
    where: CapitalLedgerWhereUniqueInput
    /**
     * In case the CapitalLedger found by the `where` argument doesn't exist, create a new CapitalLedger with this data.
     */
    create: XOR<CapitalLedgerCreateInput, CapitalLedgerUncheckedCreateInput>
    /**
     * In case the CapitalLedger was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CapitalLedgerUpdateInput, CapitalLedgerUncheckedUpdateInput>
  }

  /**
   * CapitalLedger delete
   */
  export type CapitalLedgerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerInclude<ExtArgs> | null
    /**
     * Filter which CapitalLedger to delete.
     */
    where: CapitalLedgerWhereUniqueInput
  }

  /**
   * CapitalLedger deleteMany
   */
  export type CapitalLedgerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CapitalLedgers to delete
     */
    where?: CapitalLedgerWhereInput
    /**
     * Limit how many CapitalLedgers to delete.
     */
    limit?: number
  }

  /**
   * CapitalLedger without action
   */
  export type CapitalLedgerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapitalLedger
     */
    select?: CapitalLedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CapitalLedger
     */
    omit?: CapitalLedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapitalLedgerInclude<ExtArgs> | null
  }


  /**
   * Model LoanAccount
   */

  export type AggregateLoanAccount = {
    _count: LoanAccountCountAggregateOutputType | null
    _avg: LoanAccountAvgAggregateOutputType | null
    _sum: LoanAccountSumAggregateOutputType | null
    _min: LoanAccountMinAggregateOutputType | null
    _max: LoanAccountMaxAggregateOutputType | null
  }

  export type LoanAccountAvgAggregateOutputType = {
    principal_amount: Decimal | null
    rate_percent: Decimal | null
    rate_amount: Decimal | null
    current_debt_principal: Decimal | null
    current_debt_interest: Decimal | null
  }

  export type LoanAccountSumAggregateOutputType = {
    principal_amount: Decimal | null
    rate_percent: Decimal | null
    rate_amount: Decimal | null
    current_debt_principal: Decimal | null
    current_debt_interest: Decimal | null
  }

  export type LoanAccountMinAggregateOutputType = {
    id: string | null
    no_rekening: string | null
    marketing_id: string | null
    customer_id: string | null
    product_id: string | null
    principal_amount: Decimal | null
    rate_percent: Decimal | null
    rate_amount: Decimal | null
    start_date: Date | null
    period_start: Date | null
    current_debt_principal: Decimal | null
    current_debt_interest: Decimal | null
    status: $Enums.StatusLoan | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type LoanAccountMaxAggregateOutputType = {
    id: string | null
    no_rekening: string | null
    marketing_id: string | null
    customer_id: string | null
    product_id: string | null
    principal_amount: Decimal | null
    rate_percent: Decimal | null
    rate_amount: Decimal | null
    start_date: Date | null
    period_start: Date | null
    current_debt_principal: Decimal | null
    current_debt_interest: Decimal | null
    status: $Enums.StatusLoan | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type LoanAccountCountAggregateOutputType = {
    id: number
    no_rekening: number
    marketing_id: number
    customer_id: number
    product_id: number
    principal_amount: number
    rate_percent: number
    rate_amount: number
    start_date: number
    period_start: number
    current_debt_principal: number
    current_debt_interest: number
    status: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type LoanAccountAvgAggregateInputType = {
    principal_amount?: true
    rate_percent?: true
    rate_amount?: true
    current_debt_principal?: true
    current_debt_interest?: true
  }

  export type LoanAccountSumAggregateInputType = {
    principal_amount?: true
    rate_percent?: true
    rate_amount?: true
    current_debt_principal?: true
    current_debt_interest?: true
  }

  export type LoanAccountMinAggregateInputType = {
    id?: true
    no_rekening?: true
    marketing_id?: true
    customer_id?: true
    product_id?: true
    principal_amount?: true
    rate_percent?: true
    rate_amount?: true
    start_date?: true
    period_start?: true
    current_debt_principal?: true
    current_debt_interest?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type LoanAccountMaxAggregateInputType = {
    id?: true
    no_rekening?: true
    marketing_id?: true
    customer_id?: true
    product_id?: true
    principal_amount?: true
    rate_percent?: true
    rate_amount?: true
    start_date?: true
    period_start?: true
    current_debt_principal?: true
    current_debt_interest?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type LoanAccountCountAggregateInputType = {
    id?: true
    no_rekening?: true
    marketing_id?: true
    customer_id?: true
    product_id?: true
    principal_amount?: true
    rate_percent?: true
    rate_amount?: true
    start_date?: true
    period_start?: true
    current_debt_principal?: true
    current_debt_interest?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type LoanAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoanAccount to aggregate.
     */
    where?: LoanAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanAccounts to fetch.
     */
    orderBy?: LoanAccountOrderByWithRelationInput | LoanAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoanAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoanAccounts
    **/
    _count?: true | LoanAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoanAccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoanAccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoanAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoanAccountMaxAggregateInputType
  }

  export type GetLoanAccountAggregateType<T extends LoanAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateLoanAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoanAccount[P]>
      : GetScalarType<T[P], AggregateLoanAccount[P]>
  }




  export type LoanAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanAccountWhereInput
    orderBy?: LoanAccountOrderByWithAggregationInput | LoanAccountOrderByWithAggregationInput[]
    by: LoanAccountScalarFieldEnum[] | LoanAccountScalarFieldEnum
    having?: LoanAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoanAccountCountAggregateInputType | true
    _avg?: LoanAccountAvgAggregateInputType
    _sum?: LoanAccountSumAggregateInputType
    _min?: LoanAccountMinAggregateInputType
    _max?: LoanAccountMaxAggregateInputType
  }

  export type LoanAccountGroupByOutputType = {
    id: string
    no_rekening: string
    marketing_id: string
    customer_id: string
    product_id: string
    principal_amount: Decimal
    rate_percent: Decimal
    rate_amount: Decimal
    start_date: Date
    period_start: Date
    current_debt_principal: Decimal
    current_debt_interest: Decimal
    status: $Enums.StatusLoan
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: LoanAccountCountAggregateOutputType | null
    _avg: LoanAccountAvgAggregateOutputType | null
    _sum: LoanAccountSumAggregateOutputType | null
    _min: LoanAccountMinAggregateOutputType | null
    _max: LoanAccountMaxAggregateOutputType | null
  }

  type GetLoanAccountGroupByPayload<T extends LoanAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoanAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoanAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoanAccountGroupByOutputType[P]>
            : GetScalarType<T[P], LoanAccountGroupByOutputType[P]>
        }
      >
    >


  export type LoanAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    no_rekening?: boolean
    marketing_id?: boolean
    customer_id?: boolean
    product_id?: boolean
    principal_amount?: boolean
    rate_percent?: boolean
    rate_amount?: boolean
    start_date?: boolean
    period_start?: boolean
    current_debt_principal?: boolean
    current_debt_interest?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    transactions?: boolean | LoanAccount$transactionsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    _count?: boolean | LoanAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loanAccount"]>

  export type LoanAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    no_rekening?: boolean
    marketing_id?: boolean
    customer_id?: boolean
    product_id?: boolean
    principal_amount?: boolean
    rate_percent?: boolean
    rate_amount?: boolean
    start_date?: boolean
    period_start?: boolean
    current_debt_principal?: boolean
    current_debt_interest?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loanAccount"]>

  export type LoanAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    no_rekening?: boolean
    marketing_id?: boolean
    customer_id?: boolean
    product_id?: boolean
    principal_amount?: boolean
    rate_percent?: boolean
    rate_amount?: boolean
    start_date?: boolean
    period_start?: boolean
    current_debt_principal?: boolean
    current_debt_interest?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loanAccount"]>

  export type LoanAccountSelectScalar = {
    id?: boolean
    no_rekening?: boolean
    marketing_id?: boolean
    customer_id?: boolean
    product_id?: boolean
    principal_amount?: boolean
    rate_percent?: boolean
    rate_amount?: boolean
    start_date?: boolean
    period_start?: boolean
    current_debt_principal?: boolean
    current_debt_interest?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type LoanAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "no_rekening" | "marketing_id" | "customer_id" | "product_id" | "principal_amount" | "rate_percent" | "rate_amount" | "start_date" | "period_start" | "current_debt_principal" | "current_debt_interest" | "status" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["loanAccount"]>
  export type LoanAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | LoanAccount$transactionsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    _count?: boolean | LoanAccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoanAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type LoanAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $LoanAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoanAccount"
    objects: {
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
      customer: Prisma.$CustomerPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      no_rekening: string
      marketing_id: string
      customer_id: string
      product_id: string
      principal_amount: Prisma.Decimal
      rate_percent: Prisma.Decimal
      rate_amount: Prisma.Decimal
      start_date: Date
      period_start: Date
      current_debt_principal: Prisma.Decimal
      current_debt_interest: Prisma.Decimal
      status: $Enums.StatusLoan
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["loanAccount"]>
    composites: {}
  }

  type LoanAccountGetPayload<S extends boolean | null | undefined | LoanAccountDefaultArgs> = $Result.GetResult<Prisma.$LoanAccountPayload, S>

  type LoanAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoanAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoanAccountCountAggregateInputType | true
    }

  export interface LoanAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoanAccount'], meta: { name: 'LoanAccount' } }
    /**
     * Find zero or one LoanAccount that matches the filter.
     * @param {LoanAccountFindUniqueArgs} args - Arguments to find a LoanAccount
     * @example
     * // Get one LoanAccount
     * const loanAccount = await prisma.loanAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanAccountFindUniqueArgs>(args: SelectSubset<T, LoanAccountFindUniqueArgs<ExtArgs>>): Prisma__LoanAccountClient<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoanAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoanAccountFindUniqueOrThrowArgs} args - Arguments to find a LoanAccount
     * @example
     * // Get one LoanAccount
     * const loanAccount = await prisma.loanAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, LoanAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoanAccountClient<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoanAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAccountFindFirstArgs} args - Arguments to find a LoanAccount
     * @example
     * // Get one LoanAccount
     * const loanAccount = await prisma.loanAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanAccountFindFirstArgs>(args?: SelectSubset<T, LoanAccountFindFirstArgs<ExtArgs>>): Prisma__LoanAccountClient<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoanAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAccountFindFirstOrThrowArgs} args - Arguments to find a LoanAccount
     * @example
     * // Get one LoanAccount
     * const loanAccount = await prisma.loanAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, LoanAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoanAccountClient<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoanAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoanAccounts
     * const loanAccounts = await prisma.loanAccount.findMany()
     * 
     * // Get first 10 LoanAccounts
     * const loanAccounts = await prisma.loanAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loanAccountWithIdOnly = await prisma.loanAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoanAccountFindManyArgs>(args?: SelectSubset<T, LoanAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoanAccount.
     * @param {LoanAccountCreateArgs} args - Arguments to create a LoanAccount.
     * @example
     * // Create one LoanAccount
     * const LoanAccount = await prisma.loanAccount.create({
     *   data: {
     *     // ... data to create a LoanAccount
     *   }
     * })
     * 
     */
    create<T extends LoanAccountCreateArgs>(args: SelectSubset<T, LoanAccountCreateArgs<ExtArgs>>): Prisma__LoanAccountClient<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoanAccounts.
     * @param {LoanAccountCreateManyArgs} args - Arguments to create many LoanAccounts.
     * @example
     * // Create many LoanAccounts
     * const loanAccount = await prisma.loanAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoanAccountCreateManyArgs>(args?: SelectSubset<T, LoanAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoanAccounts and returns the data saved in the database.
     * @param {LoanAccountCreateManyAndReturnArgs} args - Arguments to create many LoanAccounts.
     * @example
     * // Create many LoanAccounts
     * const loanAccount = await prisma.loanAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoanAccounts and only return the `id`
     * const loanAccountWithIdOnly = await prisma.loanAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoanAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, LoanAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoanAccount.
     * @param {LoanAccountDeleteArgs} args - Arguments to delete one LoanAccount.
     * @example
     * // Delete one LoanAccount
     * const LoanAccount = await prisma.loanAccount.delete({
     *   where: {
     *     // ... filter to delete one LoanAccount
     *   }
     * })
     * 
     */
    delete<T extends LoanAccountDeleteArgs>(args: SelectSubset<T, LoanAccountDeleteArgs<ExtArgs>>): Prisma__LoanAccountClient<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoanAccount.
     * @param {LoanAccountUpdateArgs} args - Arguments to update one LoanAccount.
     * @example
     * // Update one LoanAccount
     * const loanAccount = await prisma.loanAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoanAccountUpdateArgs>(args: SelectSubset<T, LoanAccountUpdateArgs<ExtArgs>>): Prisma__LoanAccountClient<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoanAccounts.
     * @param {LoanAccountDeleteManyArgs} args - Arguments to filter LoanAccounts to delete.
     * @example
     * // Delete a few LoanAccounts
     * const { count } = await prisma.loanAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoanAccountDeleteManyArgs>(args?: SelectSubset<T, LoanAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoanAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoanAccounts
     * const loanAccount = await prisma.loanAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoanAccountUpdateManyArgs>(args: SelectSubset<T, LoanAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoanAccounts and returns the data updated in the database.
     * @param {LoanAccountUpdateManyAndReturnArgs} args - Arguments to update many LoanAccounts.
     * @example
     * // Update many LoanAccounts
     * const loanAccount = await prisma.loanAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoanAccounts and only return the `id`
     * const loanAccountWithIdOnly = await prisma.loanAccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoanAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, LoanAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoanAccount.
     * @param {LoanAccountUpsertArgs} args - Arguments to update or create a LoanAccount.
     * @example
     * // Update or create a LoanAccount
     * const loanAccount = await prisma.loanAccount.upsert({
     *   create: {
     *     // ... data to create a LoanAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoanAccount we want to update
     *   }
     * })
     */
    upsert<T extends LoanAccountUpsertArgs>(args: SelectSubset<T, LoanAccountUpsertArgs<ExtArgs>>): Prisma__LoanAccountClient<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoanAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAccountCountArgs} args - Arguments to filter LoanAccounts to count.
     * @example
     * // Count the number of LoanAccounts
     * const count = await prisma.loanAccount.count({
     *   where: {
     *     // ... the filter for the LoanAccounts we want to count
     *   }
     * })
    **/
    count<T extends LoanAccountCountArgs>(
      args?: Subset<T, LoanAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoanAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoanAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoanAccountAggregateArgs>(args: Subset<T, LoanAccountAggregateArgs>): Prisma.PrismaPromise<GetLoanAccountAggregateType<T>>

    /**
     * Group by LoanAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoanAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoanAccountGroupByArgs['orderBy'] }
        : { orderBy?: LoanAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoanAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoanAccount model
   */
  readonly fields: LoanAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoanAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoanAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transactions<T extends LoanAccount$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, LoanAccount$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoanAccount model
   */
  interface LoanAccountFieldRefs {
    readonly id: FieldRef<"LoanAccount", 'String'>
    readonly no_rekening: FieldRef<"LoanAccount", 'String'>
    readonly marketing_id: FieldRef<"LoanAccount", 'String'>
    readonly customer_id: FieldRef<"LoanAccount", 'String'>
    readonly product_id: FieldRef<"LoanAccount", 'String'>
    readonly principal_amount: FieldRef<"LoanAccount", 'Decimal'>
    readonly rate_percent: FieldRef<"LoanAccount", 'Decimal'>
    readonly rate_amount: FieldRef<"LoanAccount", 'Decimal'>
    readonly start_date: FieldRef<"LoanAccount", 'DateTime'>
    readonly period_start: FieldRef<"LoanAccount", 'DateTime'>
    readonly current_debt_principal: FieldRef<"LoanAccount", 'Decimal'>
    readonly current_debt_interest: FieldRef<"LoanAccount", 'Decimal'>
    readonly status: FieldRef<"LoanAccount", 'StatusLoan'>
    readonly created_at: FieldRef<"LoanAccount", 'DateTime'>
    readonly updated_at: FieldRef<"LoanAccount", 'DateTime'>
    readonly deleted_at: FieldRef<"LoanAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoanAccount findUnique
   */
  export type LoanAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
    /**
     * Filter, which LoanAccount to fetch.
     */
    where: LoanAccountWhereUniqueInput
  }

  /**
   * LoanAccount findUniqueOrThrow
   */
  export type LoanAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
    /**
     * Filter, which LoanAccount to fetch.
     */
    where: LoanAccountWhereUniqueInput
  }

  /**
   * LoanAccount findFirst
   */
  export type LoanAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
    /**
     * Filter, which LoanAccount to fetch.
     */
    where?: LoanAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanAccounts to fetch.
     */
    orderBy?: LoanAccountOrderByWithRelationInput | LoanAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoanAccounts.
     */
    cursor?: LoanAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanAccounts.
     */
    distinct?: LoanAccountScalarFieldEnum | LoanAccountScalarFieldEnum[]
  }

  /**
   * LoanAccount findFirstOrThrow
   */
  export type LoanAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
    /**
     * Filter, which LoanAccount to fetch.
     */
    where?: LoanAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanAccounts to fetch.
     */
    orderBy?: LoanAccountOrderByWithRelationInput | LoanAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoanAccounts.
     */
    cursor?: LoanAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanAccounts.
     */
    distinct?: LoanAccountScalarFieldEnum | LoanAccountScalarFieldEnum[]
  }

  /**
   * LoanAccount findMany
   */
  export type LoanAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
    /**
     * Filter, which LoanAccounts to fetch.
     */
    where?: LoanAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanAccounts to fetch.
     */
    orderBy?: LoanAccountOrderByWithRelationInput | LoanAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoanAccounts.
     */
    cursor?: LoanAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanAccounts.
     */
    skip?: number
    distinct?: LoanAccountScalarFieldEnum | LoanAccountScalarFieldEnum[]
  }

  /**
   * LoanAccount create
   */
  export type LoanAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a LoanAccount.
     */
    data: XOR<LoanAccountCreateInput, LoanAccountUncheckedCreateInput>
  }

  /**
   * LoanAccount createMany
   */
  export type LoanAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoanAccounts.
     */
    data: LoanAccountCreateManyInput | LoanAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoanAccount createManyAndReturn
   */
  export type LoanAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * The data used to create many LoanAccounts.
     */
    data: LoanAccountCreateManyInput | LoanAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoanAccount update
   */
  export type LoanAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a LoanAccount.
     */
    data: XOR<LoanAccountUpdateInput, LoanAccountUncheckedUpdateInput>
    /**
     * Choose, which LoanAccount to update.
     */
    where: LoanAccountWhereUniqueInput
  }

  /**
   * LoanAccount updateMany
   */
  export type LoanAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoanAccounts.
     */
    data: XOR<LoanAccountUpdateManyMutationInput, LoanAccountUncheckedUpdateManyInput>
    /**
     * Filter which LoanAccounts to update
     */
    where?: LoanAccountWhereInput
    /**
     * Limit how many LoanAccounts to update.
     */
    limit?: number
  }

  /**
   * LoanAccount updateManyAndReturn
   */
  export type LoanAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * The data used to update LoanAccounts.
     */
    data: XOR<LoanAccountUpdateManyMutationInput, LoanAccountUncheckedUpdateManyInput>
    /**
     * Filter which LoanAccounts to update
     */
    where?: LoanAccountWhereInput
    /**
     * Limit how many LoanAccounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoanAccount upsert
   */
  export type LoanAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the LoanAccount to update in case it exists.
     */
    where: LoanAccountWhereUniqueInput
    /**
     * In case the LoanAccount found by the `where` argument doesn't exist, create a new LoanAccount with this data.
     */
    create: XOR<LoanAccountCreateInput, LoanAccountUncheckedCreateInput>
    /**
     * In case the LoanAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoanAccountUpdateInput, LoanAccountUncheckedUpdateInput>
  }

  /**
   * LoanAccount delete
   */
  export type LoanAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
    /**
     * Filter which LoanAccount to delete.
     */
    where: LoanAccountWhereUniqueInput
  }

  /**
   * LoanAccount deleteMany
   */
  export type LoanAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoanAccounts to delete
     */
    where?: LoanAccountWhereInput
    /**
     * Limit how many LoanAccounts to delete.
     */
    limit?: number
  }

  /**
   * LoanAccount.transactions
   */
  export type LoanAccount$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * LoanAccount without action
   */
  export type LoanAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanAccount
     */
    select?: LoanAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanAccount
     */
    omit?: LoanAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanAccountInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount_paid: Decimal | null
    principal_cut: Decimal | null
    interest_cut: Decimal | null
    remaining_principal: Decimal | null
    remaining_interest: Decimal | null
  }

  export type TransactionSumAggregateOutputType = {
    amount_paid: Decimal | null
    principal_cut: Decimal | null
    interest_cut: Decimal | null
    remaining_principal: Decimal | null
    remaining_interest: Decimal | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    invoice_number: string | null
    loan_account_id: string | null
    processed_by_id: string | null
    approved_by_id: string | null
    amount_paid: Decimal | null
    principal_cut: Decimal | null
    interest_cut: Decimal | null
    remaining_principal: Decimal | null
    remaining_interest: Decimal | null
    payment_method: string | null
    payment_attachment: string | null
    payment_status: $Enums.StatusTransaction | null
    paid_date: Date | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    invoice_number: string | null
    loan_account_id: string | null
    processed_by_id: string | null
    approved_by_id: string | null
    amount_paid: Decimal | null
    principal_cut: Decimal | null
    interest_cut: Decimal | null
    remaining_principal: Decimal | null
    remaining_interest: Decimal | null
    payment_method: string | null
    payment_attachment: string | null
    payment_status: $Enums.StatusTransaction | null
    paid_date: Date | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    invoice_number: number
    loan_account_id: number
    processed_by_id: number
    approved_by_id: number
    amount_paid: number
    principal_cut: number
    interest_cut: number
    remaining_principal: number
    remaining_interest: number
    payment_method: number
    payment_attachment: number
    payment_status: number
    paid_date: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount_paid?: true
    principal_cut?: true
    interest_cut?: true
    remaining_principal?: true
    remaining_interest?: true
  }

  export type TransactionSumAggregateInputType = {
    amount_paid?: true
    principal_cut?: true
    interest_cut?: true
    remaining_principal?: true
    remaining_interest?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    invoice_number?: true
    loan_account_id?: true
    processed_by_id?: true
    approved_by_id?: true
    amount_paid?: true
    principal_cut?: true
    interest_cut?: true
    remaining_principal?: true
    remaining_interest?: true
    payment_method?: true
    payment_attachment?: true
    payment_status?: true
    paid_date?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    invoice_number?: true
    loan_account_id?: true
    processed_by_id?: true
    approved_by_id?: true
    amount_paid?: true
    principal_cut?: true
    interest_cut?: true
    remaining_principal?: true
    remaining_interest?: true
    payment_method?: true
    payment_attachment?: true
    payment_status?: true
    paid_date?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    invoice_number?: true
    loan_account_id?: true
    processed_by_id?: true
    approved_by_id?: true
    amount_paid?: true
    principal_cut?: true
    interest_cut?: true
    remaining_principal?: true
    remaining_interest?: true
    payment_method?: true
    payment_attachment?: true
    payment_status?: true
    paid_date?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    invoice_number: string
    loan_account_id: string
    processed_by_id: string
    approved_by_id: string
    amount_paid: Decimal
    principal_cut: Decimal
    interest_cut: Decimal
    remaining_principal: Decimal
    remaining_interest: Decimal
    payment_method: string
    payment_attachment: string | null
    payment_status: $Enums.StatusTransaction
    paid_date: Date
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoice_number?: boolean
    loan_account_id?: boolean
    processed_by_id?: boolean
    approved_by_id?: boolean
    amount_paid?: boolean
    principal_cut?: boolean
    interest_cut?: boolean
    remaining_principal?: boolean
    remaining_interest?: boolean
    payment_method?: boolean
    payment_attachment?: boolean
    payment_status?: boolean
    paid_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    loan_account?: boolean | LoanAccountDefaultArgs<ExtArgs>
    processed?: boolean | UserDefaultArgs<ExtArgs>
    approved?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoice_number?: boolean
    loan_account_id?: boolean
    processed_by_id?: boolean
    approved_by_id?: boolean
    amount_paid?: boolean
    principal_cut?: boolean
    interest_cut?: boolean
    remaining_principal?: boolean
    remaining_interest?: boolean
    payment_method?: boolean
    payment_attachment?: boolean
    payment_status?: boolean
    paid_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    loan_account?: boolean | LoanAccountDefaultArgs<ExtArgs>
    processed?: boolean | UserDefaultArgs<ExtArgs>
    approved?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoice_number?: boolean
    loan_account_id?: boolean
    processed_by_id?: boolean
    approved_by_id?: boolean
    amount_paid?: boolean
    principal_cut?: boolean
    interest_cut?: boolean
    remaining_principal?: boolean
    remaining_interest?: boolean
    payment_method?: boolean
    payment_attachment?: boolean
    payment_status?: boolean
    paid_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    loan_account?: boolean | LoanAccountDefaultArgs<ExtArgs>
    processed?: boolean | UserDefaultArgs<ExtArgs>
    approved?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    invoice_number?: boolean
    loan_account_id?: boolean
    processed_by_id?: boolean
    approved_by_id?: boolean
    amount_paid?: boolean
    principal_cut?: boolean
    interest_cut?: boolean
    remaining_principal?: boolean
    remaining_interest?: boolean
    payment_method?: boolean
    payment_attachment?: boolean
    payment_status?: boolean
    paid_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invoice_number" | "loan_account_id" | "processed_by_id" | "approved_by_id" | "amount_paid" | "principal_cut" | "interest_cut" | "remaining_principal" | "remaining_interest" | "payment_method" | "payment_attachment" | "payment_status" | "paid_date" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan_account?: boolean | LoanAccountDefaultArgs<ExtArgs>
    processed?: boolean | UserDefaultArgs<ExtArgs>
    approved?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan_account?: boolean | LoanAccountDefaultArgs<ExtArgs>
    processed?: boolean | UserDefaultArgs<ExtArgs>
    approved?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan_account?: boolean | LoanAccountDefaultArgs<ExtArgs>
    processed?: boolean | UserDefaultArgs<ExtArgs>
    approved?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      loan_account: Prisma.$LoanAccountPayload<ExtArgs>
      processed: Prisma.$UserPayload<ExtArgs>
      approved: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      invoice_number: string
      loan_account_id: string
      processed_by_id: string
      approved_by_id: string
      amount_paid: Prisma.Decimal
      principal_cut: Prisma.Decimal
      interest_cut: Prisma.Decimal
      remaining_principal: Prisma.Decimal
      remaining_interest: Prisma.Decimal
      payment_method: string
      payment_attachment: string | null
      payment_status: $Enums.StatusTransaction
      paid_date: Date
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loan_account<T extends LoanAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoanAccountDefaultArgs<ExtArgs>>): Prisma__LoanAccountClient<$Result.GetResult<Prisma.$LoanAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    processed<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approved<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly invoice_number: FieldRef<"Transaction", 'String'>
    readonly loan_account_id: FieldRef<"Transaction", 'String'>
    readonly processed_by_id: FieldRef<"Transaction", 'String'>
    readonly approved_by_id: FieldRef<"Transaction", 'String'>
    readonly amount_paid: FieldRef<"Transaction", 'Decimal'>
    readonly principal_cut: FieldRef<"Transaction", 'Decimal'>
    readonly interest_cut: FieldRef<"Transaction", 'Decimal'>
    readonly remaining_principal: FieldRef<"Transaction", 'Decimal'>
    readonly remaining_interest: FieldRef<"Transaction", 'Decimal'>
    readonly payment_method: FieldRef<"Transaction", 'String'>
    readonly payment_attachment: FieldRef<"Transaction", 'String'>
    readonly payment_status: FieldRef<"Transaction", 'StatusTransaction'>
    readonly paid_date: FieldRef<"Transaction", 'DateTime'>
    readonly created_at: FieldRef<"Transaction", 'DateTime'>
    readonly updated_at: FieldRef<"Transaction", 'DateTime'>
    readonly deleted_at: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    full_name: 'full_name',
    username: 'username',
    email: 'email',
    password_hash: 'password_hash',
    phone_number: 'phone_number',
    birthday: 'birthday',
    address: 'address',
    regency: 'regency',
    province: 'province',
    zip_code: 'zip_code',
    images: 'images',
    access_token: 'access_token',
    role: 'role',
    isActive: 'isActive',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    full_name: 'full_name',
    phone_number: 'phone_number',
    address: 'address',
    regency: 'regency',
    province: 'province',
    zip_code: 'zip_code',
    job: 'job',
    isActive: 'isActive',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    product_name: 'product_name',
    slug: 'slug',
    description: 'description',
    price: 'price',
    isActive: 'isActive',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const CapitalLedgerScalarFieldEnum: {
    id: 'id',
    created_by_id: 'created_by_id',
    amount: 'amount',
    type: 'type',
    description: 'description',
    refrence_number: 'refrence_number',
    notes: 'notes',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type CapitalLedgerScalarFieldEnum = (typeof CapitalLedgerScalarFieldEnum)[keyof typeof CapitalLedgerScalarFieldEnum]


  export const LoanAccountScalarFieldEnum: {
    id: 'id',
    no_rekening: 'no_rekening',
    marketing_id: 'marketing_id',
    customer_id: 'customer_id',
    product_id: 'product_id',
    principal_amount: 'principal_amount',
    rate_percent: 'rate_percent',
    rate_amount: 'rate_amount',
    start_date: 'start_date',
    period_start: 'period_start',
    current_debt_principal: 'current_debt_principal',
    current_debt_interest: 'current_debt_interest',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type LoanAccountScalarFieldEnum = (typeof LoanAccountScalarFieldEnum)[keyof typeof LoanAccountScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    invoice_number: 'invoice_number',
    loan_account_id: 'loan_account_id',
    processed_by_id: 'processed_by_id',
    approved_by_id: 'approved_by_id',
    amount_paid: 'amount_paid',
    principal_cut: 'principal_cut',
    interest_cut: 'interest_cut',
    remaining_principal: 'remaining_principal',
    remaining_interest: 'remaining_interest',
    payment_method: 'payment_method',
    payment_attachment: 'payment_attachment',
    payment_status: 'payment_status',
    paid_date: 'paid_date',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'TypeCapitalLedger'
   */
  export type EnumTypeCapitalLedgerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeCapitalLedger'>
    


  /**
   * Reference to a field of type 'TypeCapitalLedger[]'
   */
  export type ListEnumTypeCapitalLedgerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeCapitalLedger[]'>
    


  /**
   * Reference to a field of type 'StatusLoan'
   */
  export type EnumStatusLoanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusLoan'>
    


  /**
   * Reference to a field of type 'StatusLoan[]'
   */
  export type ListEnumStatusLoanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusLoan[]'>
    


  /**
   * Reference to a field of type 'StatusTransaction'
   */
  export type EnumStatusTransactionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusTransaction'>
    


  /**
   * Reference to a field of type 'StatusTransaction[]'
   */
  export type ListEnumStatusTransactionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusTransaction[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    full_name?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    phone_number?: StringNullableFilter<"User"> | string | null
    birthday?: DateTimeNullableFilter<"User"> | Date | string | null
    address?: StringNullableFilter<"User"> | string | null
    regency?: StringNullableFilter<"User"> | string | null
    province?: StringNullableFilter<"User"> | string | null
    zip_code?: StringNullableFilter<"User"> | string | null
    images?: StringNullableFilter<"User"> | string | null
    access_token?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableFilter<"User"> | Date | string | null
    customers?: CustomerListRelationFilter
    products?: ProductListRelationFilter
    capital_ledgers?: CapitalLedgerListRelationFilter
    loan_accounts?: LoanAccountListRelationFilter
    transactions_processed?: TransactionListRelationFilter
    transactions_approved?: TransactionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    full_name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    phone_number?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    regency?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    zip_code?: SortOrderInput | SortOrder
    images?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    customers?: CustomerOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
    capital_ledgers?: CapitalLedgerOrderByRelationAggregateInput
    loan_accounts?: LoanAccountOrderByRelationAggregateInput
    transactions_processed?: TransactionOrderByRelationAggregateInput
    transactions_approved?: TransactionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    full_name?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    phone_number?: StringNullableFilter<"User"> | string | null
    birthday?: DateTimeNullableFilter<"User"> | Date | string | null
    address?: StringNullableFilter<"User"> | string | null
    regency?: StringNullableFilter<"User"> | string | null
    province?: StringNullableFilter<"User"> | string | null
    zip_code?: StringNullableFilter<"User"> | string | null
    images?: StringNullableFilter<"User"> | string | null
    access_token?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableFilter<"User"> | Date | string | null
    customers?: CustomerListRelationFilter
    products?: ProductListRelationFilter
    capital_ledgers?: CapitalLedgerListRelationFilter
    loan_accounts?: LoanAccountListRelationFilter
    transactions_processed?: TransactionListRelationFilter
    transactions_approved?: TransactionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    full_name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    phone_number?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    regency?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    zip_code?: SortOrderInput | SortOrder
    images?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    full_name?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    phone_number?: StringNullableWithAggregatesFilter<"User"> | string | null
    birthday?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    address?: StringNullableWithAggregatesFilter<"User"> | string | null
    regency?: StringNullableWithAggregatesFilter<"User"> | string | null
    province?: StringNullableWithAggregatesFilter<"User"> | string | null
    zip_code?: StringNullableWithAggregatesFilter<"User"> | string | null
    images?: StringNullableWithAggregatesFilter<"User"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    user_id?: StringFilter<"Customer"> | string
    full_name?: StringFilter<"Customer"> | string
    phone_number?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    regency?: StringNullableFilter<"Customer"> | string | null
    province?: StringNullableFilter<"Customer"> | string | null
    zip_code?: StringNullableFilter<"Customer"> | string | null
    job?: StringNullableFilter<"Customer"> | string | null
    isActive?: BoolFilter<"Customer"> | boolean
    created_at?: DateTimeFilter<"Customer"> | Date | string
    updated_at?: DateTimeFilter<"Customer"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Customer"> | Date | string | null
    loan_accounts?: LoanAccountListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    full_name?: SortOrder
    phone_number?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    regency?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    zip_code?: SortOrderInput | SortOrder
    job?: SortOrderInput | SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    loan_accounts?: LoanAccountOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    user_id?: StringFilter<"Customer"> | string
    full_name?: StringFilter<"Customer"> | string
    phone_number?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    regency?: StringNullableFilter<"Customer"> | string | null
    province?: StringNullableFilter<"Customer"> | string | null
    zip_code?: StringNullableFilter<"Customer"> | string | null
    job?: StringNullableFilter<"Customer"> | string | null
    isActive?: BoolFilter<"Customer"> | boolean
    created_at?: DateTimeFilter<"Customer"> | Date | string
    updated_at?: DateTimeFilter<"Customer"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Customer"> | Date | string | null
    loan_accounts?: LoanAccountListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    full_name?: SortOrder
    phone_number?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    regency?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    zip_code?: SortOrderInput | SortOrder
    job?: SortOrderInput | SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    user_id?: StringWithAggregatesFilter<"Customer"> | string
    full_name?: StringWithAggregatesFilter<"Customer"> | string
    phone_number?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    address?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    regency?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    province?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    zip_code?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    job?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    isActive?: BoolWithAggregatesFilter<"Customer"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    user_id?: StringFilter<"Product"> | string
    product_name?: StringFilter<"Product"> | string
    slug?: StringNullableFilter<"Product"> | string | null
    description?: StringFilter<"Product"> | string
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"Product"> | boolean
    created_at?: DateTimeFilter<"Product"> | Date | string
    updated_at?: DateTimeFilter<"Product"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Product"> | Date | string | null
    loan_accounts?: LoanAccountListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    product_name?: SortOrder
    slug?: SortOrderInput | SortOrder
    description?: SortOrder
    price?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    loan_accounts?: LoanAccountOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    user_id?: StringFilter<"Product"> | string
    product_name?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"Product"> | boolean
    created_at?: DateTimeFilter<"Product"> | Date | string
    updated_at?: DateTimeFilter<"Product"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Product"> | Date | string | null
    loan_accounts?: LoanAccountListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    product_name?: SortOrder
    slug?: SortOrderInput | SortOrder
    description?: SortOrder
    price?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    user_id?: StringWithAggregatesFilter<"Product"> | string
    product_name?: StringWithAggregatesFilter<"Product"> | string
    slug?: StringNullableWithAggregatesFilter<"Product"> | string | null
    description?: StringWithAggregatesFilter<"Product"> | string
    price?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Product"> | Date | string | null
  }

  export type CapitalLedgerWhereInput = {
    AND?: CapitalLedgerWhereInput | CapitalLedgerWhereInput[]
    OR?: CapitalLedgerWhereInput[]
    NOT?: CapitalLedgerWhereInput | CapitalLedgerWhereInput[]
    id?: StringFilter<"CapitalLedger"> | string
    created_by_id?: StringFilter<"CapitalLedger"> | string
    amount?: DecimalFilter<"CapitalLedger"> | Decimal | DecimalJsLike | number | string
    type?: EnumTypeCapitalLedgerFilter<"CapitalLedger"> | $Enums.TypeCapitalLedger
    description?: StringFilter<"CapitalLedger"> | string
    refrence_number?: StringNullableFilter<"CapitalLedger"> | string | null
    notes?: StringNullableFilter<"CapitalLedger"> | string | null
    created_at?: DateTimeFilter<"CapitalLedger"> | Date | string
    updated_at?: DateTimeFilter<"CapitalLedger"> | Date | string
    deleted_at?: DateTimeNullableFilter<"CapitalLedger"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CapitalLedgerOrderByWithRelationInput = {
    id?: SortOrder
    created_by_id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrder
    refrence_number?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CapitalLedgerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CapitalLedgerWhereInput | CapitalLedgerWhereInput[]
    OR?: CapitalLedgerWhereInput[]
    NOT?: CapitalLedgerWhereInput | CapitalLedgerWhereInput[]
    created_by_id?: StringFilter<"CapitalLedger"> | string
    amount?: DecimalFilter<"CapitalLedger"> | Decimal | DecimalJsLike | number | string
    type?: EnumTypeCapitalLedgerFilter<"CapitalLedger"> | $Enums.TypeCapitalLedger
    description?: StringFilter<"CapitalLedger"> | string
    refrence_number?: StringNullableFilter<"CapitalLedger"> | string | null
    notes?: StringNullableFilter<"CapitalLedger"> | string | null
    created_at?: DateTimeFilter<"CapitalLedger"> | Date | string
    updated_at?: DateTimeFilter<"CapitalLedger"> | Date | string
    deleted_at?: DateTimeNullableFilter<"CapitalLedger"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CapitalLedgerOrderByWithAggregationInput = {
    id?: SortOrder
    created_by_id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrder
    refrence_number?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: CapitalLedgerCountOrderByAggregateInput
    _avg?: CapitalLedgerAvgOrderByAggregateInput
    _max?: CapitalLedgerMaxOrderByAggregateInput
    _min?: CapitalLedgerMinOrderByAggregateInput
    _sum?: CapitalLedgerSumOrderByAggregateInput
  }

  export type CapitalLedgerScalarWhereWithAggregatesInput = {
    AND?: CapitalLedgerScalarWhereWithAggregatesInput | CapitalLedgerScalarWhereWithAggregatesInput[]
    OR?: CapitalLedgerScalarWhereWithAggregatesInput[]
    NOT?: CapitalLedgerScalarWhereWithAggregatesInput | CapitalLedgerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CapitalLedger"> | string
    created_by_id?: StringWithAggregatesFilter<"CapitalLedger"> | string
    amount?: DecimalWithAggregatesFilter<"CapitalLedger"> | Decimal | DecimalJsLike | number | string
    type?: EnumTypeCapitalLedgerWithAggregatesFilter<"CapitalLedger"> | $Enums.TypeCapitalLedger
    description?: StringWithAggregatesFilter<"CapitalLedger"> | string
    refrence_number?: StringNullableWithAggregatesFilter<"CapitalLedger"> | string | null
    notes?: StringNullableWithAggregatesFilter<"CapitalLedger"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"CapitalLedger"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"CapitalLedger"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"CapitalLedger"> | Date | string | null
  }

  export type LoanAccountWhereInput = {
    AND?: LoanAccountWhereInput | LoanAccountWhereInput[]
    OR?: LoanAccountWhereInput[]
    NOT?: LoanAccountWhereInput | LoanAccountWhereInput[]
    id?: StringFilter<"LoanAccount"> | string
    no_rekening?: StringFilter<"LoanAccount"> | string
    marketing_id?: StringFilter<"LoanAccount"> | string
    customer_id?: StringFilter<"LoanAccount"> | string
    product_id?: StringFilter<"LoanAccount"> | string
    principal_amount?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFilter<"LoanAccount"> | Date | string
    period_start?: DateTimeFilter<"LoanAccount"> | Date | string
    current_debt_principal?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFilter<"LoanAccount"> | $Enums.StatusLoan
    created_at?: DateTimeFilter<"LoanAccount"> | Date | string
    updated_at?: DateTimeFilter<"LoanAccount"> | Date | string
    deleted_at?: DateTimeNullableFilter<"LoanAccount"> | Date | string | null
    transactions?: TransactionListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type LoanAccountOrderByWithRelationInput = {
    id?: SortOrder
    no_rekening?: SortOrder
    marketing_id?: SortOrder
    customer_id?: SortOrder
    product_id?: SortOrder
    principal_amount?: SortOrder
    rate_percent?: SortOrder
    rate_amount?: SortOrder
    start_date?: SortOrder
    period_start?: SortOrder
    current_debt_principal?: SortOrder
    current_debt_interest?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    transactions?: TransactionOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type LoanAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    no_rekening?: string
    AND?: LoanAccountWhereInput | LoanAccountWhereInput[]
    OR?: LoanAccountWhereInput[]
    NOT?: LoanAccountWhereInput | LoanAccountWhereInput[]
    marketing_id?: StringFilter<"LoanAccount"> | string
    customer_id?: StringFilter<"LoanAccount"> | string
    product_id?: StringFilter<"LoanAccount"> | string
    principal_amount?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFilter<"LoanAccount"> | Date | string
    period_start?: DateTimeFilter<"LoanAccount"> | Date | string
    current_debt_principal?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFilter<"LoanAccount"> | $Enums.StatusLoan
    created_at?: DateTimeFilter<"LoanAccount"> | Date | string
    updated_at?: DateTimeFilter<"LoanAccount"> | Date | string
    deleted_at?: DateTimeNullableFilter<"LoanAccount"> | Date | string | null
    transactions?: TransactionListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id" | "no_rekening">

  export type LoanAccountOrderByWithAggregationInput = {
    id?: SortOrder
    no_rekening?: SortOrder
    marketing_id?: SortOrder
    customer_id?: SortOrder
    product_id?: SortOrder
    principal_amount?: SortOrder
    rate_percent?: SortOrder
    rate_amount?: SortOrder
    start_date?: SortOrder
    period_start?: SortOrder
    current_debt_principal?: SortOrder
    current_debt_interest?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: LoanAccountCountOrderByAggregateInput
    _avg?: LoanAccountAvgOrderByAggregateInput
    _max?: LoanAccountMaxOrderByAggregateInput
    _min?: LoanAccountMinOrderByAggregateInput
    _sum?: LoanAccountSumOrderByAggregateInput
  }

  export type LoanAccountScalarWhereWithAggregatesInput = {
    AND?: LoanAccountScalarWhereWithAggregatesInput | LoanAccountScalarWhereWithAggregatesInput[]
    OR?: LoanAccountScalarWhereWithAggregatesInput[]
    NOT?: LoanAccountScalarWhereWithAggregatesInput | LoanAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoanAccount"> | string
    no_rekening?: StringWithAggregatesFilter<"LoanAccount"> | string
    marketing_id?: StringWithAggregatesFilter<"LoanAccount"> | string
    customer_id?: StringWithAggregatesFilter<"LoanAccount"> | string
    product_id?: StringWithAggregatesFilter<"LoanAccount"> | string
    principal_amount?: DecimalWithAggregatesFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalWithAggregatesFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalWithAggregatesFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeWithAggregatesFilter<"LoanAccount"> | Date | string
    period_start?: DateTimeWithAggregatesFilter<"LoanAccount"> | Date | string
    current_debt_principal?: DecimalWithAggregatesFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalWithAggregatesFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanWithAggregatesFilter<"LoanAccount"> | $Enums.StatusLoan
    created_at?: DateTimeWithAggregatesFilter<"LoanAccount"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"LoanAccount"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"LoanAccount"> | Date | string | null
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    invoice_number?: StringFilter<"Transaction"> | string
    loan_account_id?: StringFilter<"Transaction"> | string
    processed_by_id?: StringFilter<"Transaction"> | string
    approved_by_id?: StringFilter<"Transaction"> | string
    amount_paid?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    payment_method?: StringFilter<"Transaction"> | string
    payment_attachment?: StringNullableFilter<"Transaction"> | string | null
    payment_status?: EnumStatusTransactionFilter<"Transaction"> | $Enums.StatusTransaction
    paid_date?: DateTimeFilter<"Transaction"> | Date | string
    created_at?: DateTimeFilter<"Transaction"> | Date | string
    updated_at?: DateTimeFilter<"Transaction"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    loan_account?: XOR<LoanAccountScalarRelationFilter, LoanAccountWhereInput>
    processed?: XOR<UserScalarRelationFilter, UserWhereInput>
    approved?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    invoice_number?: SortOrder
    loan_account_id?: SortOrder
    processed_by_id?: SortOrder
    approved_by_id?: SortOrder
    amount_paid?: SortOrder
    principal_cut?: SortOrder
    interest_cut?: SortOrder
    remaining_principal?: SortOrder
    remaining_interest?: SortOrder
    payment_method?: SortOrder
    payment_attachment?: SortOrderInput | SortOrder
    payment_status?: SortOrder
    paid_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    loan_account?: LoanAccountOrderByWithRelationInput
    processed?: UserOrderByWithRelationInput
    approved?: UserOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    invoice_number?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    loan_account_id?: StringFilter<"Transaction"> | string
    processed_by_id?: StringFilter<"Transaction"> | string
    approved_by_id?: StringFilter<"Transaction"> | string
    amount_paid?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    payment_method?: StringFilter<"Transaction"> | string
    payment_attachment?: StringNullableFilter<"Transaction"> | string | null
    payment_status?: EnumStatusTransactionFilter<"Transaction"> | $Enums.StatusTransaction
    paid_date?: DateTimeFilter<"Transaction"> | Date | string
    created_at?: DateTimeFilter<"Transaction"> | Date | string
    updated_at?: DateTimeFilter<"Transaction"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    loan_account?: XOR<LoanAccountScalarRelationFilter, LoanAccountWhereInput>
    processed?: XOR<UserScalarRelationFilter, UserWhereInput>
    approved?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "invoice_number">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    invoice_number?: SortOrder
    loan_account_id?: SortOrder
    processed_by_id?: SortOrder
    approved_by_id?: SortOrder
    amount_paid?: SortOrder
    principal_cut?: SortOrder
    interest_cut?: SortOrder
    remaining_principal?: SortOrder
    remaining_interest?: SortOrder
    payment_method?: SortOrder
    payment_attachment?: SortOrderInput | SortOrder
    payment_status?: SortOrder
    paid_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    invoice_number?: StringWithAggregatesFilter<"Transaction"> | string
    loan_account_id?: StringWithAggregatesFilter<"Transaction"> | string
    processed_by_id?: StringWithAggregatesFilter<"Transaction"> | string
    approved_by_id?: StringWithAggregatesFilter<"Transaction"> | string
    amount_paid?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    payment_method?: StringWithAggregatesFilter<"Transaction"> | string
    payment_attachment?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    payment_status?: EnumStatusTransactionWithAggregatesFilter<"Transaction"> | $Enums.StatusTransaction
    paid_date?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Transaction"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    customers?: CustomerCreateNestedManyWithoutUserInput
    products?: ProductCreateNestedManyWithoutUserInput
    capital_ledgers?: CapitalLedgerCreateNestedManyWithoutUserInput
    loan_accounts?: LoanAccountCreateNestedManyWithoutUserInput
    transactions_processed?: TransactionCreateNestedManyWithoutProcessedInput
    transactions_approved?: TransactionCreateNestedManyWithoutApprovedInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    customers?: CustomerUncheckedCreateNestedManyWithoutUserInput
    products?: ProductUncheckedCreateNestedManyWithoutUserInput
    capital_ledgers?: CapitalLedgerUncheckedCreateNestedManyWithoutUserInput
    loan_accounts?: LoanAccountUncheckedCreateNestedManyWithoutUserInput
    transactions_processed?: TransactionUncheckedCreateNestedManyWithoutProcessedInput
    transactions_approved?: TransactionUncheckedCreateNestedManyWithoutApprovedInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customers?: CustomerUpdateManyWithoutUserNestedInput
    products?: ProductUpdateManyWithoutUserNestedInput
    capital_ledgers?: CapitalLedgerUpdateManyWithoutUserNestedInput
    loan_accounts?: LoanAccountUpdateManyWithoutUserNestedInput
    transactions_processed?: TransactionUpdateManyWithoutProcessedNestedInput
    transactions_approved?: TransactionUpdateManyWithoutApprovedNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customers?: CustomerUncheckedUpdateManyWithoutUserNestedInput
    products?: ProductUncheckedUpdateManyWithoutUserNestedInput
    capital_ledgers?: CapitalLedgerUncheckedUpdateManyWithoutUserNestedInput
    loan_accounts?: LoanAccountUncheckedUpdateManyWithoutUserNestedInput
    transactions_processed?: TransactionUncheckedUpdateManyWithoutProcessedNestedInput
    transactions_approved?: TransactionUncheckedUpdateManyWithoutApprovedNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CustomerCreateInput = {
    id?: string
    full_name: string
    phone_number?: string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    job?: string | null
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    loan_accounts?: LoanAccountCreateNestedManyWithoutCustomerInput
    user: UserCreateNestedOneWithoutCustomersInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    user_id: string
    full_name: string
    phone_number?: string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    job?: string | null
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    loan_accounts?: LoanAccountUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    job?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loan_accounts?: LoanAccountUpdateManyWithoutCustomerNestedInput
    user?: UserUpdateOneRequiredWithoutCustomersNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    job?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loan_accounts?: LoanAccountUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    user_id: string
    full_name: string
    phone_number?: string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    job?: string | null
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    job?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    job?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductCreateInput = {
    id?: string
    product_name: string
    slug?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    loan_accounts?: LoanAccountCreateNestedManyWithoutProductInput
    user: UserCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    user_id: string
    product_name: string
    slug?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    loan_accounts?: LoanAccountUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loan_accounts?: LoanAccountUpdateManyWithoutProductNestedInput
    user?: UserUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loan_accounts?: LoanAccountUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    user_id: string
    product_name: string
    slug?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CapitalLedgerCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.TypeCapitalLedger
    description: string
    refrence_number?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    user: UserCreateNestedOneWithoutCapital_ledgersInput
  }

  export type CapitalLedgerUncheckedCreateInput = {
    id?: string
    created_by_id: string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.TypeCapitalLedger
    description: string
    refrence_number?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type CapitalLedgerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTypeCapitalLedgerFieldUpdateOperationsInput | $Enums.TypeCapitalLedger
    description?: StringFieldUpdateOperationsInput | string
    refrence_number?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutCapital_ledgersNestedInput
  }

  export type CapitalLedgerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_by_id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTypeCapitalLedgerFieldUpdateOperationsInput | $Enums.TypeCapitalLedger
    description?: StringFieldUpdateOperationsInput | string
    refrence_number?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CapitalLedgerCreateManyInput = {
    id?: string
    created_by_id: string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.TypeCapitalLedger
    description: string
    refrence_number?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type CapitalLedgerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTypeCapitalLedgerFieldUpdateOperationsInput | $Enums.TypeCapitalLedger
    description?: StringFieldUpdateOperationsInput | string
    refrence_number?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CapitalLedgerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_by_id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTypeCapitalLedgerFieldUpdateOperationsInput | $Enums.TypeCapitalLedger
    description?: StringFieldUpdateOperationsInput | string
    refrence_number?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LoanAccountCreateInput = {
    id?: string
    no_rekening: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    transactions?: TransactionCreateNestedManyWithoutLoan_accountInput
    user: UserCreateNestedOneWithoutLoan_accountsInput
    customer: CustomerCreateNestedOneWithoutLoan_accountsInput
    product: ProductCreateNestedOneWithoutLoan_accountsInput
  }

  export type LoanAccountUncheckedCreateInput = {
    id?: string
    no_rekening: string
    marketing_id: string
    customer_id: string
    product_id: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutLoan_accountInput
  }

  export type LoanAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUpdateManyWithoutLoan_accountNestedInput
    user?: UserUpdateOneRequiredWithoutLoan_accountsNestedInput
    customer?: CustomerUpdateOneRequiredWithoutLoan_accountsNestedInput
    product?: ProductUpdateOneRequiredWithoutLoan_accountsNestedInput
  }

  export type LoanAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    marketing_id?: StringFieldUpdateOperationsInput | string
    customer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutLoan_accountNestedInput
  }

  export type LoanAccountCreateManyInput = {
    id?: string
    no_rekening: string
    marketing_id: string
    customer_id: string
    product_id: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type LoanAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LoanAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    marketing_id?: StringFieldUpdateOperationsInput | string
    customer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionCreateInput = {
    id?: string
    invoice_number: string
    amount_paid: Decimal | DecimalJsLike | number | string
    principal_cut: Decimal | DecimalJsLike | number | string
    interest_cut: Decimal | DecimalJsLike | number | string
    remaining_principal: Decimal | DecimalJsLike | number | string
    remaining_interest: Decimal | DecimalJsLike | number | string
    payment_method?: string
    payment_attachment?: string | null
    payment_status?: $Enums.StatusTransaction
    paid_date: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    loan_account: LoanAccountCreateNestedOneWithoutTransactionsInput
    processed: UserCreateNestedOneWithoutTransactions_processedInput
    approved: UserCreateNestedOneWithoutTransactions_approvedInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    invoice_number: string
    loan_account_id: string
    processed_by_id: string
    approved_by_id: string
    amount_paid: Decimal | DecimalJsLike | number | string
    principal_cut: Decimal | DecimalJsLike | number | string
    interest_cut: Decimal | DecimalJsLike | number | string
    remaining_principal: Decimal | DecimalJsLike | number | string
    remaining_interest: Decimal | DecimalJsLike | number | string
    payment_method?: string
    payment_attachment?: string | null
    payment_status?: $Enums.StatusTransaction
    paid_date: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loan_account?: LoanAccountUpdateOneRequiredWithoutTransactionsNestedInput
    processed?: UserUpdateOneRequiredWithoutTransactions_processedNestedInput
    approved?: UserUpdateOneRequiredWithoutTransactions_approvedNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    loan_account_id?: StringFieldUpdateOperationsInput | string
    processed_by_id?: StringFieldUpdateOperationsInput | string
    approved_by_id?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionCreateManyInput = {
    id?: string
    invoice_number: string
    loan_account_id: string
    processed_by_id: string
    approved_by_id: string
    amount_paid: Decimal | DecimalJsLike | number | string
    principal_cut: Decimal | DecimalJsLike | number | string
    interest_cut: Decimal | DecimalJsLike | number | string
    remaining_principal: Decimal | DecimalJsLike | number | string
    remaining_interest: Decimal | DecimalJsLike | number | string
    payment_method?: string
    payment_attachment?: string | null
    payment_status?: $Enums.StatusTransaction
    paid_date: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    loan_account_id?: StringFieldUpdateOperationsInput | string
    processed_by_id?: StringFieldUpdateOperationsInput | string
    approved_by_id?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CustomerListRelationFilter = {
    every?: CustomerWhereInput
    some?: CustomerWhereInput
    none?: CustomerWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type CapitalLedgerListRelationFilter = {
    every?: CapitalLedgerWhereInput
    some?: CapitalLedgerWhereInput
    none?: CapitalLedgerWhereInput
  }

  export type LoanAccountListRelationFilter = {
    every?: LoanAccountWhereInput
    some?: LoanAccountWhereInput
    none?: LoanAccountWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CustomerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CapitalLedgerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoanAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    full_name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    phone_number?: SortOrder
    birthday?: SortOrder
    address?: SortOrder
    regency?: SortOrder
    province?: SortOrder
    zip_code?: SortOrder
    images?: SortOrder
    access_token?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    full_name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    phone_number?: SortOrder
    birthday?: SortOrder
    address?: SortOrder
    regency?: SortOrder
    province?: SortOrder
    zip_code?: SortOrder
    images?: SortOrder
    access_token?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    full_name?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    phone_number?: SortOrder
    birthday?: SortOrder
    address?: SortOrder
    regency?: SortOrder
    province?: SortOrder
    zip_code?: SortOrder
    images?: SortOrder
    access_token?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    full_name?: SortOrder
    phone_number?: SortOrder
    address?: SortOrder
    regency?: SortOrder
    province?: SortOrder
    zip_code?: SortOrder
    job?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    full_name?: SortOrder
    phone_number?: SortOrder
    address?: SortOrder
    regency?: SortOrder
    province?: SortOrder
    zip_code?: SortOrder
    job?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    full_name?: SortOrder
    phone_number?: SortOrder
    address?: SortOrder
    regency?: SortOrder
    province?: SortOrder
    zip_code?: SortOrder
    job?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    product_name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    product_name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    product_name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    isActive?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumTypeCapitalLedgerFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeCapitalLedger | EnumTypeCapitalLedgerFieldRefInput<$PrismaModel>
    in?: $Enums.TypeCapitalLedger[] | ListEnumTypeCapitalLedgerFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeCapitalLedger[] | ListEnumTypeCapitalLedgerFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeCapitalLedgerFilter<$PrismaModel> | $Enums.TypeCapitalLedger
  }

  export type CapitalLedgerCountOrderByAggregateInput = {
    id?: SortOrder
    created_by_id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrder
    refrence_number?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type CapitalLedgerAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type CapitalLedgerMaxOrderByAggregateInput = {
    id?: SortOrder
    created_by_id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrder
    refrence_number?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type CapitalLedgerMinOrderByAggregateInput = {
    id?: SortOrder
    created_by_id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrder
    refrence_number?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type CapitalLedgerSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumTypeCapitalLedgerWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeCapitalLedger | EnumTypeCapitalLedgerFieldRefInput<$PrismaModel>
    in?: $Enums.TypeCapitalLedger[] | ListEnumTypeCapitalLedgerFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeCapitalLedger[] | ListEnumTypeCapitalLedgerFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeCapitalLedgerWithAggregatesFilter<$PrismaModel> | $Enums.TypeCapitalLedger
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeCapitalLedgerFilter<$PrismaModel>
    _max?: NestedEnumTypeCapitalLedgerFilter<$PrismaModel>
  }

  export type EnumStatusLoanFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusLoan | EnumStatusLoanFieldRefInput<$PrismaModel>
    in?: $Enums.StatusLoan[] | ListEnumStatusLoanFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusLoan[] | ListEnumStatusLoanFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusLoanFilter<$PrismaModel> | $Enums.StatusLoan
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type LoanAccountCountOrderByAggregateInput = {
    id?: SortOrder
    no_rekening?: SortOrder
    marketing_id?: SortOrder
    customer_id?: SortOrder
    product_id?: SortOrder
    principal_amount?: SortOrder
    rate_percent?: SortOrder
    rate_amount?: SortOrder
    start_date?: SortOrder
    period_start?: SortOrder
    current_debt_principal?: SortOrder
    current_debt_interest?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type LoanAccountAvgOrderByAggregateInput = {
    principal_amount?: SortOrder
    rate_percent?: SortOrder
    rate_amount?: SortOrder
    current_debt_principal?: SortOrder
    current_debt_interest?: SortOrder
  }

  export type LoanAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    no_rekening?: SortOrder
    marketing_id?: SortOrder
    customer_id?: SortOrder
    product_id?: SortOrder
    principal_amount?: SortOrder
    rate_percent?: SortOrder
    rate_amount?: SortOrder
    start_date?: SortOrder
    period_start?: SortOrder
    current_debt_principal?: SortOrder
    current_debt_interest?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type LoanAccountMinOrderByAggregateInput = {
    id?: SortOrder
    no_rekening?: SortOrder
    marketing_id?: SortOrder
    customer_id?: SortOrder
    product_id?: SortOrder
    principal_amount?: SortOrder
    rate_percent?: SortOrder
    rate_amount?: SortOrder
    start_date?: SortOrder
    period_start?: SortOrder
    current_debt_principal?: SortOrder
    current_debt_interest?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type LoanAccountSumOrderByAggregateInput = {
    principal_amount?: SortOrder
    rate_percent?: SortOrder
    rate_amount?: SortOrder
    current_debt_principal?: SortOrder
    current_debt_interest?: SortOrder
  }

  export type EnumStatusLoanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusLoan | EnumStatusLoanFieldRefInput<$PrismaModel>
    in?: $Enums.StatusLoan[] | ListEnumStatusLoanFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusLoan[] | ListEnumStatusLoanFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusLoanWithAggregatesFilter<$PrismaModel> | $Enums.StatusLoan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusLoanFilter<$PrismaModel>
    _max?: NestedEnumStatusLoanFilter<$PrismaModel>
  }

  export type EnumStatusTransactionFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusTransaction | EnumStatusTransactionFieldRefInput<$PrismaModel>
    in?: $Enums.StatusTransaction[] | ListEnumStatusTransactionFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusTransaction[] | ListEnumStatusTransactionFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusTransactionFilter<$PrismaModel> | $Enums.StatusTransaction
  }

  export type LoanAccountScalarRelationFilter = {
    is?: LoanAccountWhereInput
    isNot?: LoanAccountWhereInput
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    invoice_number?: SortOrder
    loan_account_id?: SortOrder
    processed_by_id?: SortOrder
    approved_by_id?: SortOrder
    amount_paid?: SortOrder
    principal_cut?: SortOrder
    interest_cut?: SortOrder
    remaining_principal?: SortOrder
    remaining_interest?: SortOrder
    payment_method?: SortOrder
    payment_attachment?: SortOrder
    payment_status?: SortOrder
    paid_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount_paid?: SortOrder
    principal_cut?: SortOrder
    interest_cut?: SortOrder
    remaining_principal?: SortOrder
    remaining_interest?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    invoice_number?: SortOrder
    loan_account_id?: SortOrder
    processed_by_id?: SortOrder
    approved_by_id?: SortOrder
    amount_paid?: SortOrder
    principal_cut?: SortOrder
    interest_cut?: SortOrder
    remaining_principal?: SortOrder
    remaining_interest?: SortOrder
    payment_method?: SortOrder
    payment_attachment?: SortOrder
    payment_status?: SortOrder
    paid_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    invoice_number?: SortOrder
    loan_account_id?: SortOrder
    processed_by_id?: SortOrder
    approved_by_id?: SortOrder
    amount_paid?: SortOrder
    principal_cut?: SortOrder
    interest_cut?: SortOrder
    remaining_principal?: SortOrder
    remaining_interest?: SortOrder
    payment_method?: SortOrder
    payment_attachment?: SortOrder
    payment_status?: SortOrder
    paid_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount_paid?: SortOrder
    principal_cut?: SortOrder
    interest_cut?: SortOrder
    remaining_principal?: SortOrder
    remaining_interest?: SortOrder
  }

  export type EnumStatusTransactionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusTransaction | EnumStatusTransactionFieldRefInput<$PrismaModel>
    in?: $Enums.StatusTransaction[] | ListEnumStatusTransactionFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusTransaction[] | ListEnumStatusTransactionFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusTransactionWithAggregatesFilter<$PrismaModel> | $Enums.StatusTransaction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusTransactionFilter<$PrismaModel>
    _max?: NestedEnumStatusTransactionFilter<$PrismaModel>
  }

  export type CustomerCreateNestedManyWithoutUserInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput> | CustomerCreateWithoutUserInput[] | CustomerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput | CustomerCreateOrConnectWithoutUserInput[]
    createMany?: CustomerCreateManyUserInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutUserInput = {
    create?: XOR<ProductCreateWithoutUserInput, ProductUncheckedCreateWithoutUserInput> | ProductCreateWithoutUserInput[] | ProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutUserInput | ProductCreateOrConnectWithoutUserInput[]
    createMany?: ProductCreateManyUserInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CapitalLedgerCreateNestedManyWithoutUserInput = {
    create?: XOR<CapitalLedgerCreateWithoutUserInput, CapitalLedgerUncheckedCreateWithoutUserInput> | CapitalLedgerCreateWithoutUserInput[] | CapitalLedgerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CapitalLedgerCreateOrConnectWithoutUserInput | CapitalLedgerCreateOrConnectWithoutUserInput[]
    createMany?: CapitalLedgerCreateManyUserInputEnvelope
    connect?: CapitalLedgerWhereUniqueInput | CapitalLedgerWhereUniqueInput[]
  }

  export type LoanAccountCreateNestedManyWithoutUserInput = {
    create?: XOR<LoanAccountCreateWithoutUserInput, LoanAccountUncheckedCreateWithoutUserInput> | LoanAccountCreateWithoutUserInput[] | LoanAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoanAccountCreateOrConnectWithoutUserInput | LoanAccountCreateOrConnectWithoutUserInput[]
    createMany?: LoanAccountCreateManyUserInputEnvelope
    connect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutProcessedInput = {
    create?: XOR<TransactionCreateWithoutProcessedInput, TransactionUncheckedCreateWithoutProcessedInput> | TransactionCreateWithoutProcessedInput[] | TransactionUncheckedCreateWithoutProcessedInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutProcessedInput | TransactionCreateOrConnectWithoutProcessedInput[]
    createMany?: TransactionCreateManyProcessedInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutApprovedInput = {
    create?: XOR<TransactionCreateWithoutApprovedInput, TransactionUncheckedCreateWithoutApprovedInput> | TransactionCreateWithoutApprovedInput[] | TransactionUncheckedCreateWithoutApprovedInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutApprovedInput | TransactionCreateOrConnectWithoutApprovedInput[]
    createMany?: TransactionCreateManyApprovedInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type CustomerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput> | CustomerCreateWithoutUserInput[] | CustomerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput | CustomerCreateOrConnectWithoutUserInput[]
    createMany?: CustomerCreateManyUserInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProductCreateWithoutUserInput, ProductUncheckedCreateWithoutUserInput> | ProductCreateWithoutUserInput[] | ProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutUserInput | ProductCreateOrConnectWithoutUserInput[]
    createMany?: ProductCreateManyUserInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CapitalLedgerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CapitalLedgerCreateWithoutUserInput, CapitalLedgerUncheckedCreateWithoutUserInput> | CapitalLedgerCreateWithoutUserInput[] | CapitalLedgerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CapitalLedgerCreateOrConnectWithoutUserInput | CapitalLedgerCreateOrConnectWithoutUserInput[]
    createMany?: CapitalLedgerCreateManyUserInputEnvelope
    connect?: CapitalLedgerWhereUniqueInput | CapitalLedgerWhereUniqueInput[]
  }

  export type LoanAccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LoanAccountCreateWithoutUserInput, LoanAccountUncheckedCreateWithoutUserInput> | LoanAccountCreateWithoutUserInput[] | LoanAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoanAccountCreateOrConnectWithoutUserInput | LoanAccountCreateOrConnectWithoutUserInput[]
    createMany?: LoanAccountCreateManyUserInputEnvelope
    connect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutProcessedInput = {
    create?: XOR<TransactionCreateWithoutProcessedInput, TransactionUncheckedCreateWithoutProcessedInput> | TransactionCreateWithoutProcessedInput[] | TransactionUncheckedCreateWithoutProcessedInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutProcessedInput | TransactionCreateOrConnectWithoutProcessedInput[]
    createMany?: TransactionCreateManyProcessedInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutApprovedInput = {
    create?: XOR<TransactionCreateWithoutApprovedInput, TransactionUncheckedCreateWithoutApprovedInput> | TransactionCreateWithoutApprovedInput[] | TransactionUncheckedCreateWithoutApprovedInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutApprovedInput | TransactionCreateOrConnectWithoutApprovedInput[]
    createMany?: TransactionCreateManyApprovedInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CustomerUpdateManyWithoutUserNestedInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput> | CustomerCreateWithoutUserInput[] | CustomerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput | CustomerCreateOrConnectWithoutUserInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutUserInput | CustomerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CustomerCreateManyUserInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutUserInput | CustomerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutUserInput | CustomerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProductCreateWithoutUserInput, ProductUncheckedCreateWithoutUserInput> | ProductCreateWithoutUserInput[] | ProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutUserInput | ProductCreateOrConnectWithoutUserInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutUserInput | ProductUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProductCreateManyUserInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutUserInput | ProductUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutUserInput | ProductUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CapitalLedgerUpdateManyWithoutUserNestedInput = {
    create?: XOR<CapitalLedgerCreateWithoutUserInput, CapitalLedgerUncheckedCreateWithoutUserInput> | CapitalLedgerCreateWithoutUserInput[] | CapitalLedgerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CapitalLedgerCreateOrConnectWithoutUserInput | CapitalLedgerCreateOrConnectWithoutUserInput[]
    upsert?: CapitalLedgerUpsertWithWhereUniqueWithoutUserInput | CapitalLedgerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CapitalLedgerCreateManyUserInputEnvelope
    set?: CapitalLedgerWhereUniqueInput | CapitalLedgerWhereUniqueInput[]
    disconnect?: CapitalLedgerWhereUniqueInput | CapitalLedgerWhereUniqueInput[]
    delete?: CapitalLedgerWhereUniqueInput | CapitalLedgerWhereUniqueInput[]
    connect?: CapitalLedgerWhereUniqueInput | CapitalLedgerWhereUniqueInput[]
    update?: CapitalLedgerUpdateWithWhereUniqueWithoutUserInput | CapitalLedgerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CapitalLedgerUpdateManyWithWhereWithoutUserInput | CapitalLedgerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CapitalLedgerScalarWhereInput | CapitalLedgerScalarWhereInput[]
  }

  export type LoanAccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<LoanAccountCreateWithoutUserInput, LoanAccountUncheckedCreateWithoutUserInput> | LoanAccountCreateWithoutUserInput[] | LoanAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoanAccountCreateOrConnectWithoutUserInput | LoanAccountCreateOrConnectWithoutUserInput[]
    upsert?: LoanAccountUpsertWithWhereUniqueWithoutUserInput | LoanAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LoanAccountCreateManyUserInputEnvelope
    set?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    disconnect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    delete?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    connect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    update?: LoanAccountUpdateWithWhereUniqueWithoutUserInput | LoanAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LoanAccountUpdateManyWithWhereWithoutUserInput | LoanAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LoanAccountScalarWhereInput | LoanAccountScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutProcessedNestedInput = {
    create?: XOR<TransactionCreateWithoutProcessedInput, TransactionUncheckedCreateWithoutProcessedInput> | TransactionCreateWithoutProcessedInput[] | TransactionUncheckedCreateWithoutProcessedInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutProcessedInput | TransactionCreateOrConnectWithoutProcessedInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutProcessedInput | TransactionUpsertWithWhereUniqueWithoutProcessedInput[]
    createMany?: TransactionCreateManyProcessedInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutProcessedInput | TransactionUpdateWithWhereUniqueWithoutProcessedInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutProcessedInput | TransactionUpdateManyWithWhereWithoutProcessedInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutApprovedNestedInput = {
    create?: XOR<TransactionCreateWithoutApprovedInput, TransactionUncheckedCreateWithoutApprovedInput> | TransactionCreateWithoutApprovedInput[] | TransactionUncheckedCreateWithoutApprovedInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutApprovedInput | TransactionCreateOrConnectWithoutApprovedInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutApprovedInput | TransactionUpsertWithWhereUniqueWithoutApprovedInput[]
    createMany?: TransactionCreateManyApprovedInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutApprovedInput | TransactionUpdateWithWhereUniqueWithoutApprovedInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutApprovedInput | TransactionUpdateManyWithWhereWithoutApprovedInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type CustomerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput> | CustomerCreateWithoutUserInput[] | CustomerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput | CustomerCreateOrConnectWithoutUserInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutUserInput | CustomerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CustomerCreateManyUserInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutUserInput | CustomerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutUserInput | CustomerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProductCreateWithoutUserInput, ProductUncheckedCreateWithoutUserInput> | ProductCreateWithoutUserInput[] | ProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutUserInput | ProductCreateOrConnectWithoutUserInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutUserInput | ProductUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProductCreateManyUserInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutUserInput | ProductUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutUserInput | ProductUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CapitalLedgerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CapitalLedgerCreateWithoutUserInput, CapitalLedgerUncheckedCreateWithoutUserInput> | CapitalLedgerCreateWithoutUserInput[] | CapitalLedgerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CapitalLedgerCreateOrConnectWithoutUserInput | CapitalLedgerCreateOrConnectWithoutUserInput[]
    upsert?: CapitalLedgerUpsertWithWhereUniqueWithoutUserInput | CapitalLedgerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CapitalLedgerCreateManyUserInputEnvelope
    set?: CapitalLedgerWhereUniqueInput | CapitalLedgerWhereUniqueInput[]
    disconnect?: CapitalLedgerWhereUniqueInput | CapitalLedgerWhereUniqueInput[]
    delete?: CapitalLedgerWhereUniqueInput | CapitalLedgerWhereUniqueInput[]
    connect?: CapitalLedgerWhereUniqueInput | CapitalLedgerWhereUniqueInput[]
    update?: CapitalLedgerUpdateWithWhereUniqueWithoutUserInput | CapitalLedgerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CapitalLedgerUpdateManyWithWhereWithoutUserInput | CapitalLedgerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CapitalLedgerScalarWhereInput | CapitalLedgerScalarWhereInput[]
  }

  export type LoanAccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LoanAccountCreateWithoutUserInput, LoanAccountUncheckedCreateWithoutUserInput> | LoanAccountCreateWithoutUserInput[] | LoanAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LoanAccountCreateOrConnectWithoutUserInput | LoanAccountCreateOrConnectWithoutUserInput[]
    upsert?: LoanAccountUpsertWithWhereUniqueWithoutUserInput | LoanAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LoanAccountCreateManyUserInputEnvelope
    set?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    disconnect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    delete?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    connect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    update?: LoanAccountUpdateWithWhereUniqueWithoutUserInput | LoanAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LoanAccountUpdateManyWithWhereWithoutUserInput | LoanAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LoanAccountScalarWhereInput | LoanAccountScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutProcessedNestedInput = {
    create?: XOR<TransactionCreateWithoutProcessedInput, TransactionUncheckedCreateWithoutProcessedInput> | TransactionCreateWithoutProcessedInput[] | TransactionUncheckedCreateWithoutProcessedInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutProcessedInput | TransactionCreateOrConnectWithoutProcessedInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutProcessedInput | TransactionUpsertWithWhereUniqueWithoutProcessedInput[]
    createMany?: TransactionCreateManyProcessedInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutProcessedInput | TransactionUpdateWithWhereUniqueWithoutProcessedInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutProcessedInput | TransactionUpdateManyWithWhereWithoutProcessedInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutApprovedNestedInput = {
    create?: XOR<TransactionCreateWithoutApprovedInput, TransactionUncheckedCreateWithoutApprovedInput> | TransactionCreateWithoutApprovedInput[] | TransactionUncheckedCreateWithoutApprovedInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutApprovedInput | TransactionCreateOrConnectWithoutApprovedInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutApprovedInput | TransactionUpsertWithWhereUniqueWithoutApprovedInput[]
    createMany?: TransactionCreateManyApprovedInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutApprovedInput | TransactionUpdateWithWhereUniqueWithoutApprovedInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutApprovedInput | TransactionUpdateManyWithWhereWithoutApprovedInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type LoanAccountCreateNestedManyWithoutCustomerInput = {
    create?: XOR<LoanAccountCreateWithoutCustomerInput, LoanAccountUncheckedCreateWithoutCustomerInput> | LoanAccountCreateWithoutCustomerInput[] | LoanAccountUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: LoanAccountCreateOrConnectWithoutCustomerInput | LoanAccountCreateOrConnectWithoutCustomerInput[]
    createMany?: LoanAccountCreateManyCustomerInputEnvelope
    connect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCustomersInput = {
    create?: XOR<UserCreateWithoutCustomersInput, UserUncheckedCreateWithoutCustomersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomersInput
    connect?: UserWhereUniqueInput
  }

  export type LoanAccountUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<LoanAccountCreateWithoutCustomerInput, LoanAccountUncheckedCreateWithoutCustomerInput> | LoanAccountCreateWithoutCustomerInput[] | LoanAccountUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: LoanAccountCreateOrConnectWithoutCustomerInput | LoanAccountCreateOrConnectWithoutCustomerInput[]
    createMany?: LoanAccountCreateManyCustomerInputEnvelope
    connect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
  }

  export type LoanAccountUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<LoanAccountCreateWithoutCustomerInput, LoanAccountUncheckedCreateWithoutCustomerInput> | LoanAccountCreateWithoutCustomerInput[] | LoanAccountUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: LoanAccountCreateOrConnectWithoutCustomerInput | LoanAccountCreateOrConnectWithoutCustomerInput[]
    upsert?: LoanAccountUpsertWithWhereUniqueWithoutCustomerInput | LoanAccountUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: LoanAccountCreateManyCustomerInputEnvelope
    set?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    disconnect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    delete?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    connect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    update?: LoanAccountUpdateWithWhereUniqueWithoutCustomerInput | LoanAccountUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: LoanAccountUpdateManyWithWhereWithoutCustomerInput | LoanAccountUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: LoanAccountScalarWhereInput | LoanAccountScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutCustomersNestedInput = {
    create?: XOR<UserCreateWithoutCustomersInput, UserUncheckedCreateWithoutCustomersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomersInput
    upsert?: UserUpsertWithoutCustomersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCustomersInput, UserUpdateWithoutCustomersInput>, UserUncheckedUpdateWithoutCustomersInput>
  }

  export type LoanAccountUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<LoanAccountCreateWithoutCustomerInput, LoanAccountUncheckedCreateWithoutCustomerInput> | LoanAccountCreateWithoutCustomerInput[] | LoanAccountUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: LoanAccountCreateOrConnectWithoutCustomerInput | LoanAccountCreateOrConnectWithoutCustomerInput[]
    upsert?: LoanAccountUpsertWithWhereUniqueWithoutCustomerInput | LoanAccountUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: LoanAccountCreateManyCustomerInputEnvelope
    set?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    disconnect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    delete?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    connect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    update?: LoanAccountUpdateWithWhereUniqueWithoutCustomerInput | LoanAccountUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: LoanAccountUpdateManyWithWhereWithoutCustomerInput | LoanAccountUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: LoanAccountScalarWhereInput | LoanAccountScalarWhereInput[]
  }

  export type LoanAccountCreateNestedManyWithoutProductInput = {
    create?: XOR<LoanAccountCreateWithoutProductInput, LoanAccountUncheckedCreateWithoutProductInput> | LoanAccountCreateWithoutProductInput[] | LoanAccountUncheckedCreateWithoutProductInput[]
    connectOrCreate?: LoanAccountCreateOrConnectWithoutProductInput | LoanAccountCreateOrConnectWithoutProductInput[]
    createMany?: LoanAccountCreateManyProductInputEnvelope
    connect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutProductsInput = {
    create?: XOR<UserCreateWithoutProductsInput, UserUncheckedCreateWithoutProductsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductsInput
    connect?: UserWhereUniqueInput
  }

  export type LoanAccountUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<LoanAccountCreateWithoutProductInput, LoanAccountUncheckedCreateWithoutProductInput> | LoanAccountCreateWithoutProductInput[] | LoanAccountUncheckedCreateWithoutProductInput[]
    connectOrCreate?: LoanAccountCreateOrConnectWithoutProductInput | LoanAccountCreateOrConnectWithoutProductInput[]
    createMany?: LoanAccountCreateManyProductInputEnvelope
    connect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type LoanAccountUpdateManyWithoutProductNestedInput = {
    create?: XOR<LoanAccountCreateWithoutProductInput, LoanAccountUncheckedCreateWithoutProductInput> | LoanAccountCreateWithoutProductInput[] | LoanAccountUncheckedCreateWithoutProductInput[]
    connectOrCreate?: LoanAccountCreateOrConnectWithoutProductInput | LoanAccountCreateOrConnectWithoutProductInput[]
    upsert?: LoanAccountUpsertWithWhereUniqueWithoutProductInput | LoanAccountUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: LoanAccountCreateManyProductInputEnvelope
    set?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    disconnect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    delete?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    connect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    update?: LoanAccountUpdateWithWhereUniqueWithoutProductInput | LoanAccountUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: LoanAccountUpdateManyWithWhereWithoutProductInput | LoanAccountUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: LoanAccountScalarWhereInput | LoanAccountScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<UserCreateWithoutProductsInput, UserUncheckedCreateWithoutProductsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductsInput
    upsert?: UserUpsertWithoutProductsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProductsInput, UserUpdateWithoutProductsInput>, UserUncheckedUpdateWithoutProductsInput>
  }

  export type LoanAccountUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<LoanAccountCreateWithoutProductInput, LoanAccountUncheckedCreateWithoutProductInput> | LoanAccountCreateWithoutProductInput[] | LoanAccountUncheckedCreateWithoutProductInput[]
    connectOrCreate?: LoanAccountCreateOrConnectWithoutProductInput | LoanAccountCreateOrConnectWithoutProductInput[]
    upsert?: LoanAccountUpsertWithWhereUniqueWithoutProductInput | LoanAccountUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: LoanAccountCreateManyProductInputEnvelope
    set?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    disconnect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    delete?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    connect?: LoanAccountWhereUniqueInput | LoanAccountWhereUniqueInput[]
    update?: LoanAccountUpdateWithWhereUniqueWithoutProductInput | LoanAccountUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: LoanAccountUpdateManyWithWhereWithoutProductInput | LoanAccountUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: LoanAccountScalarWhereInput | LoanAccountScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCapital_ledgersInput = {
    create?: XOR<UserCreateWithoutCapital_ledgersInput, UserUncheckedCreateWithoutCapital_ledgersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCapital_ledgersInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTypeCapitalLedgerFieldUpdateOperationsInput = {
    set?: $Enums.TypeCapitalLedger
  }

  export type UserUpdateOneRequiredWithoutCapital_ledgersNestedInput = {
    create?: XOR<UserCreateWithoutCapital_ledgersInput, UserUncheckedCreateWithoutCapital_ledgersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCapital_ledgersInput
    upsert?: UserUpsertWithoutCapital_ledgersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCapital_ledgersInput, UserUpdateWithoutCapital_ledgersInput>, UserUncheckedUpdateWithoutCapital_ledgersInput>
  }

  export type TransactionCreateNestedManyWithoutLoan_accountInput = {
    create?: XOR<TransactionCreateWithoutLoan_accountInput, TransactionUncheckedCreateWithoutLoan_accountInput> | TransactionCreateWithoutLoan_accountInput[] | TransactionUncheckedCreateWithoutLoan_accountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutLoan_accountInput | TransactionCreateOrConnectWithoutLoan_accountInput[]
    createMany?: TransactionCreateManyLoan_accountInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutLoan_accountsInput = {
    create?: XOR<UserCreateWithoutLoan_accountsInput, UserUncheckedCreateWithoutLoan_accountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoan_accountsInput
    connect?: UserWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutLoan_accountsInput = {
    create?: XOR<CustomerCreateWithoutLoan_accountsInput, CustomerUncheckedCreateWithoutLoan_accountsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutLoan_accountsInput
    connect?: CustomerWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutLoan_accountsInput = {
    create?: XOR<ProductCreateWithoutLoan_accountsInput, ProductUncheckedCreateWithoutLoan_accountsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutLoan_accountsInput
    connect?: ProductWhereUniqueInput
  }

  export type TransactionUncheckedCreateNestedManyWithoutLoan_accountInput = {
    create?: XOR<TransactionCreateWithoutLoan_accountInput, TransactionUncheckedCreateWithoutLoan_accountInput> | TransactionCreateWithoutLoan_accountInput[] | TransactionUncheckedCreateWithoutLoan_accountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutLoan_accountInput | TransactionCreateOrConnectWithoutLoan_accountInput[]
    createMany?: TransactionCreateManyLoan_accountInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type EnumStatusLoanFieldUpdateOperationsInput = {
    set?: $Enums.StatusLoan
  }

  export type TransactionUpdateManyWithoutLoan_accountNestedInput = {
    create?: XOR<TransactionCreateWithoutLoan_accountInput, TransactionUncheckedCreateWithoutLoan_accountInput> | TransactionCreateWithoutLoan_accountInput[] | TransactionUncheckedCreateWithoutLoan_accountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutLoan_accountInput | TransactionCreateOrConnectWithoutLoan_accountInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutLoan_accountInput | TransactionUpsertWithWhereUniqueWithoutLoan_accountInput[]
    createMany?: TransactionCreateManyLoan_accountInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutLoan_accountInput | TransactionUpdateWithWhereUniqueWithoutLoan_accountInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutLoan_accountInput | TransactionUpdateManyWithWhereWithoutLoan_accountInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutLoan_accountsNestedInput = {
    create?: XOR<UserCreateWithoutLoan_accountsInput, UserUncheckedCreateWithoutLoan_accountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoan_accountsInput
    upsert?: UserUpsertWithoutLoan_accountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLoan_accountsInput, UserUpdateWithoutLoan_accountsInput>, UserUncheckedUpdateWithoutLoan_accountsInput>
  }

  export type CustomerUpdateOneRequiredWithoutLoan_accountsNestedInput = {
    create?: XOR<CustomerCreateWithoutLoan_accountsInput, CustomerUncheckedCreateWithoutLoan_accountsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutLoan_accountsInput
    upsert?: CustomerUpsertWithoutLoan_accountsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutLoan_accountsInput, CustomerUpdateWithoutLoan_accountsInput>, CustomerUncheckedUpdateWithoutLoan_accountsInput>
  }

  export type ProductUpdateOneRequiredWithoutLoan_accountsNestedInput = {
    create?: XOR<ProductCreateWithoutLoan_accountsInput, ProductUncheckedCreateWithoutLoan_accountsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutLoan_accountsInput
    upsert?: ProductUpsertWithoutLoan_accountsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutLoan_accountsInput, ProductUpdateWithoutLoan_accountsInput>, ProductUncheckedUpdateWithoutLoan_accountsInput>
  }

  export type TransactionUncheckedUpdateManyWithoutLoan_accountNestedInput = {
    create?: XOR<TransactionCreateWithoutLoan_accountInput, TransactionUncheckedCreateWithoutLoan_accountInput> | TransactionCreateWithoutLoan_accountInput[] | TransactionUncheckedCreateWithoutLoan_accountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutLoan_accountInput | TransactionCreateOrConnectWithoutLoan_accountInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutLoan_accountInput | TransactionUpsertWithWhereUniqueWithoutLoan_accountInput[]
    createMany?: TransactionCreateManyLoan_accountInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutLoan_accountInput | TransactionUpdateWithWhereUniqueWithoutLoan_accountInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutLoan_accountInput | TransactionUpdateManyWithWhereWithoutLoan_accountInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type LoanAccountCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<LoanAccountCreateWithoutTransactionsInput, LoanAccountUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: LoanAccountCreateOrConnectWithoutTransactionsInput
    connect?: LoanAccountWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTransactions_processedInput = {
    create?: XOR<UserCreateWithoutTransactions_processedInput, UserUncheckedCreateWithoutTransactions_processedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactions_processedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTransactions_approvedInput = {
    create?: XOR<UserCreateWithoutTransactions_approvedInput, UserUncheckedCreateWithoutTransactions_approvedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactions_approvedInput
    connect?: UserWhereUniqueInput
  }

  export type EnumStatusTransactionFieldUpdateOperationsInput = {
    set?: $Enums.StatusTransaction
  }

  export type LoanAccountUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<LoanAccountCreateWithoutTransactionsInput, LoanAccountUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: LoanAccountCreateOrConnectWithoutTransactionsInput
    upsert?: LoanAccountUpsertWithoutTransactionsInput
    connect?: LoanAccountWhereUniqueInput
    update?: XOR<XOR<LoanAccountUpdateToOneWithWhereWithoutTransactionsInput, LoanAccountUpdateWithoutTransactionsInput>, LoanAccountUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateOneRequiredWithoutTransactions_processedNestedInput = {
    create?: XOR<UserCreateWithoutTransactions_processedInput, UserUncheckedCreateWithoutTransactions_processedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactions_processedInput
    upsert?: UserUpsertWithoutTransactions_processedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactions_processedInput, UserUpdateWithoutTransactions_processedInput>, UserUncheckedUpdateWithoutTransactions_processedInput>
  }

  export type UserUpdateOneRequiredWithoutTransactions_approvedNestedInput = {
    create?: XOR<UserCreateWithoutTransactions_approvedInput, UserUncheckedCreateWithoutTransactions_approvedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactions_approvedInput
    upsert?: UserUpsertWithoutTransactions_approvedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactions_approvedInput, UserUpdateWithoutTransactions_approvedInput>, UserUncheckedUpdateWithoutTransactions_approvedInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumTypeCapitalLedgerFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeCapitalLedger | EnumTypeCapitalLedgerFieldRefInput<$PrismaModel>
    in?: $Enums.TypeCapitalLedger[] | ListEnumTypeCapitalLedgerFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeCapitalLedger[] | ListEnumTypeCapitalLedgerFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeCapitalLedgerFilter<$PrismaModel> | $Enums.TypeCapitalLedger
  }

  export type NestedEnumTypeCapitalLedgerWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeCapitalLedger | EnumTypeCapitalLedgerFieldRefInput<$PrismaModel>
    in?: $Enums.TypeCapitalLedger[] | ListEnumTypeCapitalLedgerFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeCapitalLedger[] | ListEnumTypeCapitalLedgerFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeCapitalLedgerWithAggregatesFilter<$PrismaModel> | $Enums.TypeCapitalLedger
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeCapitalLedgerFilter<$PrismaModel>
    _max?: NestedEnumTypeCapitalLedgerFilter<$PrismaModel>
  }

  export type NestedEnumStatusLoanFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusLoan | EnumStatusLoanFieldRefInput<$PrismaModel>
    in?: $Enums.StatusLoan[] | ListEnumStatusLoanFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusLoan[] | ListEnumStatusLoanFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusLoanFilter<$PrismaModel> | $Enums.StatusLoan
  }

  export type NestedEnumStatusLoanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusLoan | EnumStatusLoanFieldRefInput<$PrismaModel>
    in?: $Enums.StatusLoan[] | ListEnumStatusLoanFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusLoan[] | ListEnumStatusLoanFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusLoanWithAggregatesFilter<$PrismaModel> | $Enums.StatusLoan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusLoanFilter<$PrismaModel>
    _max?: NestedEnumStatusLoanFilter<$PrismaModel>
  }

  export type NestedEnumStatusTransactionFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusTransaction | EnumStatusTransactionFieldRefInput<$PrismaModel>
    in?: $Enums.StatusTransaction[] | ListEnumStatusTransactionFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusTransaction[] | ListEnumStatusTransactionFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusTransactionFilter<$PrismaModel> | $Enums.StatusTransaction
  }

  export type NestedEnumStatusTransactionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusTransaction | EnumStatusTransactionFieldRefInput<$PrismaModel>
    in?: $Enums.StatusTransaction[] | ListEnumStatusTransactionFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusTransaction[] | ListEnumStatusTransactionFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusTransactionWithAggregatesFilter<$PrismaModel> | $Enums.StatusTransaction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusTransactionFilter<$PrismaModel>
    _max?: NestedEnumStatusTransactionFilter<$PrismaModel>
  }

  export type CustomerCreateWithoutUserInput = {
    id?: string
    full_name: string
    phone_number?: string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    job?: string | null
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    loan_accounts?: LoanAccountCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutUserInput = {
    id?: string
    full_name: string
    phone_number?: string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    job?: string | null
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    loan_accounts?: LoanAccountUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutUserInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
  }

  export type CustomerCreateManyUserInputEnvelope = {
    data: CustomerCreateManyUserInput | CustomerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutUserInput = {
    id?: string
    product_name: string
    slug?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    loan_accounts?: LoanAccountCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutUserInput = {
    id?: string
    product_name: string
    slug?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    loan_accounts?: LoanAccountUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutUserInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutUserInput, ProductUncheckedCreateWithoutUserInput>
  }

  export type ProductCreateManyUserInputEnvelope = {
    data: ProductCreateManyUserInput | ProductCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CapitalLedgerCreateWithoutUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.TypeCapitalLedger
    description: string
    refrence_number?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type CapitalLedgerUncheckedCreateWithoutUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.TypeCapitalLedger
    description: string
    refrence_number?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type CapitalLedgerCreateOrConnectWithoutUserInput = {
    where: CapitalLedgerWhereUniqueInput
    create: XOR<CapitalLedgerCreateWithoutUserInput, CapitalLedgerUncheckedCreateWithoutUserInput>
  }

  export type CapitalLedgerCreateManyUserInputEnvelope = {
    data: CapitalLedgerCreateManyUserInput | CapitalLedgerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LoanAccountCreateWithoutUserInput = {
    id?: string
    no_rekening: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    transactions?: TransactionCreateNestedManyWithoutLoan_accountInput
    customer: CustomerCreateNestedOneWithoutLoan_accountsInput
    product: ProductCreateNestedOneWithoutLoan_accountsInput
  }

  export type LoanAccountUncheckedCreateWithoutUserInput = {
    id?: string
    no_rekening: string
    customer_id: string
    product_id: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutLoan_accountInput
  }

  export type LoanAccountCreateOrConnectWithoutUserInput = {
    where: LoanAccountWhereUniqueInput
    create: XOR<LoanAccountCreateWithoutUserInput, LoanAccountUncheckedCreateWithoutUserInput>
  }

  export type LoanAccountCreateManyUserInputEnvelope = {
    data: LoanAccountCreateManyUserInput | LoanAccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutProcessedInput = {
    id?: string
    invoice_number: string
    amount_paid: Decimal | DecimalJsLike | number | string
    principal_cut: Decimal | DecimalJsLike | number | string
    interest_cut: Decimal | DecimalJsLike | number | string
    remaining_principal: Decimal | DecimalJsLike | number | string
    remaining_interest: Decimal | DecimalJsLike | number | string
    payment_method?: string
    payment_attachment?: string | null
    payment_status?: $Enums.StatusTransaction
    paid_date: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    loan_account: LoanAccountCreateNestedOneWithoutTransactionsInput
    approved: UserCreateNestedOneWithoutTransactions_approvedInput
  }

  export type TransactionUncheckedCreateWithoutProcessedInput = {
    id?: string
    invoice_number: string
    loan_account_id: string
    approved_by_id: string
    amount_paid: Decimal | DecimalJsLike | number | string
    principal_cut: Decimal | DecimalJsLike | number | string
    interest_cut: Decimal | DecimalJsLike | number | string
    remaining_principal: Decimal | DecimalJsLike | number | string
    remaining_interest: Decimal | DecimalJsLike | number | string
    payment_method?: string
    payment_attachment?: string | null
    payment_status?: $Enums.StatusTransaction
    paid_date: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type TransactionCreateOrConnectWithoutProcessedInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutProcessedInput, TransactionUncheckedCreateWithoutProcessedInput>
  }

  export type TransactionCreateManyProcessedInputEnvelope = {
    data: TransactionCreateManyProcessedInput | TransactionCreateManyProcessedInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutApprovedInput = {
    id?: string
    invoice_number: string
    amount_paid: Decimal | DecimalJsLike | number | string
    principal_cut: Decimal | DecimalJsLike | number | string
    interest_cut: Decimal | DecimalJsLike | number | string
    remaining_principal: Decimal | DecimalJsLike | number | string
    remaining_interest: Decimal | DecimalJsLike | number | string
    payment_method?: string
    payment_attachment?: string | null
    payment_status?: $Enums.StatusTransaction
    paid_date: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    loan_account: LoanAccountCreateNestedOneWithoutTransactionsInput
    processed: UserCreateNestedOneWithoutTransactions_processedInput
  }

  export type TransactionUncheckedCreateWithoutApprovedInput = {
    id?: string
    invoice_number: string
    loan_account_id: string
    processed_by_id: string
    amount_paid: Decimal | DecimalJsLike | number | string
    principal_cut: Decimal | DecimalJsLike | number | string
    interest_cut: Decimal | DecimalJsLike | number | string
    remaining_principal: Decimal | DecimalJsLike | number | string
    remaining_interest: Decimal | DecimalJsLike | number | string
    payment_method?: string
    payment_attachment?: string | null
    payment_status?: $Enums.StatusTransaction
    paid_date: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type TransactionCreateOrConnectWithoutApprovedInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutApprovedInput, TransactionUncheckedCreateWithoutApprovedInput>
  }

  export type TransactionCreateManyApprovedInputEnvelope = {
    data: TransactionCreateManyApprovedInput | TransactionCreateManyApprovedInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithWhereUniqueWithoutUserInput = {
    where: CustomerWhereUniqueInput
    update: XOR<CustomerUpdateWithoutUserInput, CustomerUncheckedUpdateWithoutUserInput>
    create: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
  }

  export type CustomerUpdateWithWhereUniqueWithoutUserInput = {
    where: CustomerWhereUniqueInput
    data: XOR<CustomerUpdateWithoutUserInput, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type CustomerUpdateManyWithWhereWithoutUserInput = {
    where: CustomerScalarWhereInput
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyWithoutUserInput>
  }

  export type CustomerScalarWhereInput = {
    AND?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    OR?: CustomerScalarWhereInput[]
    NOT?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    id?: StringFilter<"Customer"> | string
    user_id?: StringFilter<"Customer"> | string
    full_name?: StringFilter<"Customer"> | string
    phone_number?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    regency?: StringNullableFilter<"Customer"> | string | null
    province?: StringNullableFilter<"Customer"> | string | null
    zip_code?: StringNullableFilter<"Customer"> | string | null
    job?: StringNullableFilter<"Customer"> | string | null
    isActive?: BoolFilter<"Customer"> | boolean
    created_at?: DateTimeFilter<"Customer"> | Date | string
    updated_at?: DateTimeFilter<"Customer"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Customer"> | Date | string | null
  }

  export type ProductUpsertWithWhereUniqueWithoutUserInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutUserInput, ProductUncheckedUpdateWithoutUserInput>
    create: XOR<ProductCreateWithoutUserInput, ProductUncheckedCreateWithoutUserInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutUserInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutUserInput, ProductUncheckedUpdateWithoutUserInput>
  }

  export type ProductUpdateManyWithWhereWithoutUserInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutUserInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    user_id?: StringFilter<"Product"> | string
    product_name?: StringFilter<"Product"> | string
    slug?: StringNullableFilter<"Product"> | string | null
    description?: StringFilter<"Product"> | string
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"Product"> | boolean
    created_at?: DateTimeFilter<"Product"> | Date | string
    updated_at?: DateTimeFilter<"Product"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Product"> | Date | string | null
  }

  export type CapitalLedgerUpsertWithWhereUniqueWithoutUserInput = {
    where: CapitalLedgerWhereUniqueInput
    update: XOR<CapitalLedgerUpdateWithoutUserInput, CapitalLedgerUncheckedUpdateWithoutUserInput>
    create: XOR<CapitalLedgerCreateWithoutUserInput, CapitalLedgerUncheckedCreateWithoutUserInput>
  }

  export type CapitalLedgerUpdateWithWhereUniqueWithoutUserInput = {
    where: CapitalLedgerWhereUniqueInput
    data: XOR<CapitalLedgerUpdateWithoutUserInput, CapitalLedgerUncheckedUpdateWithoutUserInput>
  }

  export type CapitalLedgerUpdateManyWithWhereWithoutUserInput = {
    where: CapitalLedgerScalarWhereInput
    data: XOR<CapitalLedgerUpdateManyMutationInput, CapitalLedgerUncheckedUpdateManyWithoutUserInput>
  }

  export type CapitalLedgerScalarWhereInput = {
    AND?: CapitalLedgerScalarWhereInput | CapitalLedgerScalarWhereInput[]
    OR?: CapitalLedgerScalarWhereInput[]
    NOT?: CapitalLedgerScalarWhereInput | CapitalLedgerScalarWhereInput[]
    id?: StringFilter<"CapitalLedger"> | string
    created_by_id?: StringFilter<"CapitalLedger"> | string
    amount?: DecimalFilter<"CapitalLedger"> | Decimal | DecimalJsLike | number | string
    type?: EnumTypeCapitalLedgerFilter<"CapitalLedger"> | $Enums.TypeCapitalLedger
    description?: StringFilter<"CapitalLedger"> | string
    refrence_number?: StringNullableFilter<"CapitalLedger"> | string | null
    notes?: StringNullableFilter<"CapitalLedger"> | string | null
    created_at?: DateTimeFilter<"CapitalLedger"> | Date | string
    updated_at?: DateTimeFilter<"CapitalLedger"> | Date | string
    deleted_at?: DateTimeNullableFilter<"CapitalLedger"> | Date | string | null
  }

  export type LoanAccountUpsertWithWhereUniqueWithoutUserInput = {
    where: LoanAccountWhereUniqueInput
    update: XOR<LoanAccountUpdateWithoutUserInput, LoanAccountUncheckedUpdateWithoutUserInput>
    create: XOR<LoanAccountCreateWithoutUserInput, LoanAccountUncheckedCreateWithoutUserInput>
  }

  export type LoanAccountUpdateWithWhereUniqueWithoutUserInput = {
    where: LoanAccountWhereUniqueInput
    data: XOR<LoanAccountUpdateWithoutUserInput, LoanAccountUncheckedUpdateWithoutUserInput>
  }

  export type LoanAccountUpdateManyWithWhereWithoutUserInput = {
    where: LoanAccountScalarWhereInput
    data: XOR<LoanAccountUpdateManyMutationInput, LoanAccountUncheckedUpdateManyWithoutUserInput>
  }

  export type LoanAccountScalarWhereInput = {
    AND?: LoanAccountScalarWhereInput | LoanAccountScalarWhereInput[]
    OR?: LoanAccountScalarWhereInput[]
    NOT?: LoanAccountScalarWhereInput | LoanAccountScalarWhereInput[]
    id?: StringFilter<"LoanAccount"> | string
    no_rekening?: StringFilter<"LoanAccount"> | string
    marketing_id?: StringFilter<"LoanAccount"> | string
    customer_id?: StringFilter<"LoanAccount"> | string
    product_id?: StringFilter<"LoanAccount"> | string
    principal_amount?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFilter<"LoanAccount"> | Date | string
    period_start?: DateTimeFilter<"LoanAccount"> | Date | string
    current_debt_principal?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFilter<"LoanAccount"> | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFilter<"LoanAccount"> | $Enums.StatusLoan
    created_at?: DateTimeFilter<"LoanAccount"> | Date | string
    updated_at?: DateTimeFilter<"LoanAccount"> | Date | string
    deleted_at?: DateTimeNullableFilter<"LoanAccount"> | Date | string | null
  }

  export type TransactionUpsertWithWhereUniqueWithoutProcessedInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutProcessedInput, TransactionUncheckedUpdateWithoutProcessedInput>
    create: XOR<TransactionCreateWithoutProcessedInput, TransactionUncheckedCreateWithoutProcessedInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutProcessedInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutProcessedInput, TransactionUncheckedUpdateWithoutProcessedInput>
  }

  export type TransactionUpdateManyWithWhereWithoutProcessedInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutProcessedInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    invoice_number?: StringFilter<"Transaction"> | string
    loan_account_id?: StringFilter<"Transaction"> | string
    processed_by_id?: StringFilter<"Transaction"> | string
    approved_by_id?: StringFilter<"Transaction"> | string
    amount_paid?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    payment_method?: StringFilter<"Transaction"> | string
    payment_attachment?: StringNullableFilter<"Transaction"> | string | null
    payment_status?: EnumStatusTransactionFilter<"Transaction"> | $Enums.StatusTransaction
    paid_date?: DateTimeFilter<"Transaction"> | Date | string
    created_at?: DateTimeFilter<"Transaction"> | Date | string
    updated_at?: DateTimeFilter<"Transaction"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Transaction"> | Date | string | null
  }

  export type TransactionUpsertWithWhereUniqueWithoutApprovedInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutApprovedInput, TransactionUncheckedUpdateWithoutApprovedInput>
    create: XOR<TransactionCreateWithoutApprovedInput, TransactionUncheckedCreateWithoutApprovedInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutApprovedInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutApprovedInput, TransactionUncheckedUpdateWithoutApprovedInput>
  }

  export type TransactionUpdateManyWithWhereWithoutApprovedInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutApprovedInput>
  }

  export type LoanAccountCreateWithoutCustomerInput = {
    id?: string
    no_rekening: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    transactions?: TransactionCreateNestedManyWithoutLoan_accountInput
    user: UserCreateNestedOneWithoutLoan_accountsInput
    product: ProductCreateNestedOneWithoutLoan_accountsInput
  }

  export type LoanAccountUncheckedCreateWithoutCustomerInput = {
    id?: string
    no_rekening: string
    marketing_id: string
    product_id: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutLoan_accountInput
  }

  export type LoanAccountCreateOrConnectWithoutCustomerInput = {
    where: LoanAccountWhereUniqueInput
    create: XOR<LoanAccountCreateWithoutCustomerInput, LoanAccountUncheckedCreateWithoutCustomerInput>
  }

  export type LoanAccountCreateManyCustomerInputEnvelope = {
    data: LoanAccountCreateManyCustomerInput | LoanAccountCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCustomersInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    products?: ProductCreateNestedManyWithoutUserInput
    capital_ledgers?: CapitalLedgerCreateNestedManyWithoutUserInput
    loan_accounts?: LoanAccountCreateNestedManyWithoutUserInput
    transactions_processed?: TransactionCreateNestedManyWithoutProcessedInput
    transactions_approved?: TransactionCreateNestedManyWithoutApprovedInput
  }

  export type UserUncheckedCreateWithoutCustomersInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    products?: ProductUncheckedCreateNestedManyWithoutUserInput
    capital_ledgers?: CapitalLedgerUncheckedCreateNestedManyWithoutUserInput
    loan_accounts?: LoanAccountUncheckedCreateNestedManyWithoutUserInput
    transactions_processed?: TransactionUncheckedCreateNestedManyWithoutProcessedInput
    transactions_approved?: TransactionUncheckedCreateNestedManyWithoutApprovedInput
  }

  export type UserCreateOrConnectWithoutCustomersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCustomersInput, UserUncheckedCreateWithoutCustomersInput>
  }

  export type LoanAccountUpsertWithWhereUniqueWithoutCustomerInput = {
    where: LoanAccountWhereUniqueInput
    update: XOR<LoanAccountUpdateWithoutCustomerInput, LoanAccountUncheckedUpdateWithoutCustomerInput>
    create: XOR<LoanAccountCreateWithoutCustomerInput, LoanAccountUncheckedCreateWithoutCustomerInput>
  }

  export type LoanAccountUpdateWithWhereUniqueWithoutCustomerInput = {
    where: LoanAccountWhereUniqueInput
    data: XOR<LoanAccountUpdateWithoutCustomerInput, LoanAccountUncheckedUpdateWithoutCustomerInput>
  }

  export type LoanAccountUpdateManyWithWhereWithoutCustomerInput = {
    where: LoanAccountScalarWhereInput
    data: XOR<LoanAccountUpdateManyMutationInput, LoanAccountUncheckedUpdateManyWithoutCustomerInput>
  }

  export type UserUpsertWithoutCustomersInput = {
    update: XOR<UserUpdateWithoutCustomersInput, UserUncheckedUpdateWithoutCustomersInput>
    create: XOR<UserCreateWithoutCustomersInput, UserUncheckedCreateWithoutCustomersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCustomersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCustomersInput, UserUncheckedUpdateWithoutCustomersInput>
  }

  export type UserUpdateWithoutCustomersInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    products?: ProductUpdateManyWithoutUserNestedInput
    capital_ledgers?: CapitalLedgerUpdateManyWithoutUserNestedInput
    loan_accounts?: LoanAccountUpdateManyWithoutUserNestedInput
    transactions_processed?: TransactionUpdateManyWithoutProcessedNestedInput
    transactions_approved?: TransactionUpdateManyWithoutApprovedNestedInput
  }

  export type UserUncheckedUpdateWithoutCustomersInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    products?: ProductUncheckedUpdateManyWithoutUserNestedInput
    capital_ledgers?: CapitalLedgerUncheckedUpdateManyWithoutUserNestedInput
    loan_accounts?: LoanAccountUncheckedUpdateManyWithoutUserNestedInput
    transactions_processed?: TransactionUncheckedUpdateManyWithoutProcessedNestedInput
    transactions_approved?: TransactionUncheckedUpdateManyWithoutApprovedNestedInput
  }

  export type LoanAccountCreateWithoutProductInput = {
    id?: string
    no_rekening: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    transactions?: TransactionCreateNestedManyWithoutLoan_accountInput
    user: UserCreateNestedOneWithoutLoan_accountsInput
    customer: CustomerCreateNestedOneWithoutLoan_accountsInput
  }

  export type LoanAccountUncheckedCreateWithoutProductInput = {
    id?: string
    no_rekening: string
    marketing_id: string
    customer_id: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutLoan_accountInput
  }

  export type LoanAccountCreateOrConnectWithoutProductInput = {
    where: LoanAccountWhereUniqueInput
    create: XOR<LoanAccountCreateWithoutProductInput, LoanAccountUncheckedCreateWithoutProductInput>
  }

  export type LoanAccountCreateManyProductInputEnvelope = {
    data: LoanAccountCreateManyProductInput | LoanAccountCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutProductsInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    customers?: CustomerCreateNestedManyWithoutUserInput
    capital_ledgers?: CapitalLedgerCreateNestedManyWithoutUserInput
    loan_accounts?: LoanAccountCreateNestedManyWithoutUserInput
    transactions_processed?: TransactionCreateNestedManyWithoutProcessedInput
    transactions_approved?: TransactionCreateNestedManyWithoutApprovedInput
  }

  export type UserUncheckedCreateWithoutProductsInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    customers?: CustomerUncheckedCreateNestedManyWithoutUserInput
    capital_ledgers?: CapitalLedgerUncheckedCreateNestedManyWithoutUserInput
    loan_accounts?: LoanAccountUncheckedCreateNestedManyWithoutUserInput
    transactions_processed?: TransactionUncheckedCreateNestedManyWithoutProcessedInput
    transactions_approved?: TransactionUncheckedCreateNestedManyWithoutApprovedInput
  }

  export type UserCreateOrConnectWithoutProductsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProductsInput, UserUncheckedCreateWithoutProductsInput>
  }

  export type LoanAccountUpsertWithWhereUniqueWithoutProductInput = {
    where: LoanAccountWhereUniqueInput
    update: XOR<LoanAccountUpdateWithoutProductInput, LoanAccountUncheckedUpdateWithoutProductInput>
    create: XOR<LoanAccountCreateWithoutProductInput, LoanAccountUncheckedCreateWithoutProductInput>
  }

  export type LoanAccountUpdateWithWhereUniqueWithoutProductInput = {
    where: LoanAccountWhereUniqueInput
    data: XOR<LoanAccountUpdateWithoutProductInput, LoanAccountUncheckedUpdateWithoutProductInput>
  }

  export type LoanAccountUpdateManyWithWhereWithoutProductInput = {
    where: LoanAccountScalarWhereInput
    data: XOR<LoanAccountUpdateManyMutationInput, LoanAccountUncheckedUpdateManyWithoutProductInput>
  }

  export type UserUpsertWithoutProductsInput = {
    update: XOR<UserUpdateWithoutProductsInput, UserUncheckedUpdateWithoutProductsInput>
    create: XOR<UserCreateWithoutProductsInput, UserUncheckedCreateWithoutProductsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProductsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProductsInput, UserUncheckedUpdateWithoutProductsInput>
  }

  export type UserUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customers?: CustomerUpdateManyWithoutUserNestedInput
    capital_ledgers?: CapitalLedgerUpdateManyWithoutUserNestedInput
    loan_accounts?: LoanAccountUpdateManyWithoutUserNestedInput
    transactions_processed?: TransactionUpdateManyWithoutProcessedNestedInput
    transactions_approved?: TransactionUpdateManyWithoutApprovedNestedInput
  }

  export type UserUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customers?: CustomerUncheckedUpdateManyWithoutUserNestedInput
    capital_ledgers?: CapitalLedgerUncheckedUpdateManyWithoutUserNestedInput
    loan_accounts?: LoanAccountUncheckedUpdateManyWithoutUserNestedInput
    transactions_processed?: TransactionUncheckedUpdateManyWithoutProcessedNestedInput
    transactions_approved?: TransactionUncheckedUpdateManyWithoutApprovedNestedInput
  }

  export type UserCreateWithoutCapital_ledgersInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    customers?: CustomerCreateNestedManyWithoutUserInput
    products?: ProductCreateNestedManyWithoutUserInput
    loan_accounts?: LoanAccountCreateNestedManyWithoutUserInput
    transactions_processed?: TransactionCreateNestedManyWithoutProcessedInput
    transactions_approved?: TransactionCreateNestedManyWithoutApprovedInput
  }

  export type UserUncheckedCreateWithoutCapital_ledgersInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    customers?: CustomerUncheckedCreateNestedManyWithoutUserInput
    products?: ProductUncheckedCreateNestedManyWithoutUserInput
    loan_accounts?: LoanAccountUncheckedCreateNestedManyWithoutUserInput
    transactions_processed?: TransactionUncheckedCreateNestedManyWithoutProcessedInput
    transactions_approved?: TransactionUncheckedCreateNestedManyWithoutApprovedInput
  }

  export type UserCreateOrConnectWithoutCapital_ledgersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCapital_ledgersInput, UserUncheckedCreateWithoutCapital_ledgersInput>
  }

  export type UserUpsertWithoutCapital_ledgersInput = {
    update: XOR<UserUpdateWithoutCapital_ledgersInput, UserUncheckedUpdateWithoutCapital_ledgersInput>
    create: XOR<UserCreateWithoutCapital_ledgersInput, UserUncheckedCreateWithoutCapital_ledgersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCapital_ledgersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCapital_ledgersInput, UserUncheckedUpdateWithoutCapital_ledgersInput>
  }

  export type UserUpdateWithoutCapital_ledgersInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customers?: CustomerUpdateManyWithoutUserNestedInput
    products?: ProductUpdateManyWithoutUserNestedInput
    loan_accounts?: LoanAccountUpdateManyWithoutUserNestedInput
    transactions_processed?: TransactionUpdateManyWithoutProcessedNestedInput
    transactions_approved?: TransactionUpdateManyWithoutApprovedNestedInput
  }

  export type UserUncheckedUpdateWithoutCapital_ledgersInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customers?: CustomerUncheckedUpdateManyWithoutUserNestedInput
    products?: ProductUncheckedUpdateManyWithoutUserNestedInput
    loan_accounts?: LoanAccountUncheckedUpdateManyWithoutUserNestedInput
    transactions_processed?: TransactionUncheckedUpdateManyWithoutProcessedNestedInput
    transactions_approved?: TransactionUncheckedUpdateManyWithoutApprovedNestedInput
  }

  export type TransactionCreateWithoutLoan_accountInput = {
    id?: string
    invoice_number: string
    amount_paid: Decimal | DecimalJsLike | number | string
    principal_cut: Decimal | DecimalJsLike | number | string
    interest_cut: Decimal | DecimalJsLike | number | string
    remaining_principal: Decimal | DecimalJsLike | number | string
    remaining_interest: Decimal | DecimalJsLike | number | string
    payment_method?: string
    payment_attachment?: string | null
    payment_status?: $Enums.StatusTransaction
    paid_date: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    processed: UserCreateNestedOneWithoutTransactions_processedInput
    approved: UserCreateNestedOneWithoutTransactions_approvedInput
  }

  export type TransactionUncheckedCreateWithoutLoan_accountInput = {
    id?: string
    invoice_number: string
    processed_by_id: string
    approved_by_id: string
    amount_paid: Decimal | DecimalJsLike | number | string
    principal_cut: Decimal | DecimalJsLike | number | string
    interest_cut: Decimal | DecimalJsLike | number | string
    remaining_principal: Decimal | DecimalJsLike | number | string
    remaining_interest: Decimal | DecimalJsLike | number | string
    payment_method?: string
    payment_attachment?: string | null
    payment_status?: $Enums.StatusTransaction
    paid_date: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type TransactionCreateOrConnectWithoutLoan_accountInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutLoan_accountInput, TransactionUncheckedCreateWithoutLoan_accountInput>
  }

  export type TransactionCreateManyLoan_accountInputEnvelope = {
    data: TransactionCreateManyLoan_accountInput | TransactionCreateManyLoan_accountInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutLoan_accountsInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    customers?: CustomerCreateNestedManyWithoutUserInput
    products?: ProductCreateNestedManyWithoutUserInput
    capital_ledgers?: CapitalLedgerCreateNestedManyWithoutUserInput
    transactions_processed?: TransactionCreateNestedManyWithoutProcessedInput
    transactions_approved?: TransactionCreateNestedManyWithoutApprovedInput
  }

  export type UserUncheckedCreateWithoutLoan_accountsInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    customers?: CustomerUncheckedCreateNestedManyWithoutUserInput
    products?: ProductUncheckedCreateNestedManyWithoutUserInput
    capital_ledgers?: CapitalLedgerUncheckedCreateNestedManyWithoutUserInput
    transactions_processed?: TransactionUncheckedCreateNestedManyWithoutProcessedInput
    transactions_approved?: TransactionUncheckedCreateNestedManyWithoutApprovedInput
  }

  export type UserCreateOrConnectWithoutLoan_accountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLoan_accountsInput, UserUncheckedCreateWithoutLoan_accountsInput>
  }

  export type CustomerCreateWithoutLoan_accountsInput = {
    id?: string
    full_name: string
    phone_number?: string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    job?: string | null
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    user: UserCreateNestedOneWithoutCustomersInput
  }

  export type CustomerUncheckedCreateWithoutLoan_accountsInput = {
    id?: string
    user_id: string
    full_name: string
    phone_number?: string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    job?: string | null
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type CustomerCreateOrConnectWithoutLoan_accountsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutLoan_accountsInput, CustomerUncheckedCreateWithoutLoan_accountsInput>
  }

  export type ProductCreateWithoutLoan_accountsInput = {
    id?: string
    product_name: string
    slug?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    user: UserCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutLoan_accountsInput = {
    id?: string
    user_id: string
    product_name: string
    slug?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ProductCreateOrConnectWithoutLoan_accountsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutLoan_accountsInput, ProductUncheckedCreateWithoutLoan_accountsInput>
  }

  export type TransactionUpsertWithWhereUniqueWithoutLoan_accountInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutLoan_accountInput, TransactionUncheckedUpdateWithoutLoan_accountInput>
    create: XOR<TransactionCreateWithoutLoan_accountInput, TransactionUncheckedCreateWithoutLoan_accountInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutLoan_accountInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutLoan_accountInput, TransactionUncheckedUpdateWithoutLoan_accountInput>
  }

  export type TransactionUpdateManyWithWhereWithoutLoan_accountInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutLoan_accountInput>
  }

  export type UserUpsertWithoutLoan_accountsInput = {
    update: XOR<UserUpdateWithoutLoan_accountsInput, UserUncheckedUpdateWithoutLoan_accountsInput>
    create: XOR<UserCreateWithoutLoan_accountsInput, UserUncheckedCreateWithoutLoan_accountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLoan_accountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLoan_accountsInput, UserUncheckedUpdateWithoutLoan_accountsInput>
  }

  export type UserUpdateWithoutLoan_accountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customers?: CustomerUpdateManyWithoutUserNestedInput
    products?: ProductUpdateManyWithoutUserNestedInput
    capital_ledgers?: CapitalLedgerUpdateManyWithoutUserNestedInput
    transactions_processed?: TransactionUpdateManyWithoutProcessedNestedInput
    transactions_approved?: TransactionUpdateManyWithoutApprovedNestedInput
  }

  export type UserUncheckedUpdateWithoutLoan_accountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customers?: CustomerUncheckedUpdateManyWithoutUserNestedInput
    products?: ProductUncheckedUpdateManyWithoutUserNestedInput
    capital_ledgers?: CapitalLedgerUncheckedUpdateManyWithoutUserNestedInput
    transactions_processed?: TransactionUncheckedUpdateManyWithoutProcessedNestedInput
    transactions_approved?: TransactionUncheckedUpdateManyWithoutApprovedNestedInput
  }

  export type CustomerUpsertWithoutLoan_accountsInput = {
    update: XOR<CustomerUpdateWithoutLoan_accountsInput, CustomerUncheckedUpdateWithoutLoan_accountsInput>
    create: XOR<CustomerCreateWithoutLoan_accountsInput, CustomerUncheckedCreateWithoutLoan_accountsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutLoan_accountsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutLoan_accountsInput, CustomerUncheckedUpdateWithoutLoan_accountsInput>
  }

  export type CustomerUpdateWithoutLoan_accountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    job?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutCustomersNestedInput
  }

  export type CustomerUncheckedUpdateWithoutLoan_accountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    job?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductUpsertWithoutLoan_accountsInput = {
    update: XOR<ProductUpdateWithoutLoan_accountsInput, ProductUncheckedUpdateWithoutLoan_accountsInput>
    create: XOR<ProductCreateWithoutLoan_accountsInput, ProductUncheckedCreateWithoutLoan_accountsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutLoan_accountsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutLoan_accountsInput, ProductUncheckedUpdateWithoutLoan_accountsInput>
  }

  export type ProductUpdateWithoutLoan_accountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutLoan_accountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LoanAccountCreateWithoutTransactionsInput = {
    id?: string
    no_rekening: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    user: UserCreateNestedOneWithoutLoan_accountsInput
    customer: CustomerCreateNestedOneWithoutLoan_accountsInput
    product: ProductCreateNestedOneWithoutLoan_accountsInput
  }

  export type LoanAccountUncheckedCreateWithoutTransactionsInput = {
    id?: string
    no_rekening: string
    marketing_id: string
    customer_id: string
    product_id: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type LoanAccountCreateOrConnectWithoutTransactionsInput = {
    where: LoanAccountWhereUniqueInput
    create: XOR<LoanAccountCreateWithoutTransactionsInput, LoanAccountUncheckedCreateWithoutTransactionsInput>
  }

  export type UserCreateWithoutTransactions_processedInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    customers?: CustomerCreateNestedManyWithoutUserInput
    products?: ProductCreateNestedManyWithoutUserInput
    capital_ledgers?: CapitalLedgerCreateNestedManyWithoutUserInput
    loan_accounts?: LoanAccountCreateNestedManyWithoutUserInput
    transactions_approved?: TransactionCreateNestedManyWithoutApprovedInput
  }

  export type UserUncheckedCreateWithoutTransactions_processedInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    customers?: CustomerUncheckedCreateNestedManyWithoutUserInput
    products?: ProductUncheckedCreateNestedManyWithoutUserInput
    capital_ledgers?: CapitalLedgerUncheckedCreateNestedManyWithoutUserInput
    loan_accounts?: LoanAccountUncheckedCreateNestedManyWithoutUserInput
    transactions_approved?: TransactionUncheckedCreateNestedManyWithoutApprovedInput
  }

  export type UserCreateOrConnectWithoutTransactions_processedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactions_processedInput, UserUncheckedCreateWithoutTransactions_processedInput>
  }

  export type UserCreateWithoutTransactions_approvedInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    customers?: CustomerCreateNestedManyWithoutUserInput
    products?: ProductCreateNestedManyWithoutUserInput
    capital_ledgers?: CapitalLedgerCreateNestedManyWithoutUserInput
    loan_accounts?: LoanAccountCreateNestedManyWithoutUserInput
    transactions_processed?: TransactionCreateNestedManyWithoutProcessedInput
  }

  export type UserUncheckedCreateWithoutTransactions_approvedInput = {
    id?: string
    full_name: string
    username: string
    email: string
    password_hash: string
    phone_number?: string | null
    birthday?: Date | string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    images?: string | null
    access_token?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    customers?: CustomerUncheckedCreateNestedManyWithoutUserInput
    products?: ProductUncheckedCreateNestedManyWithoutUserInput
    capital_ledgers?: CapitalLedgerUncheckedCreateNestedManyWithoutUserInput
    loan_accounts?: LoanAccountUncheckedCreateNestedManyWithoutUserInput
    transactions_processed?: TransactionUncheckedCreateNestedManyWithoutProcessedInput
  }

  export type UserCreateOrConnectWithoutTransactions_approvedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactions_approvedInput, UserUncheckedCreateWithoutTransactions_approvedInput>
  }

  export type LoanAccountUpsertWithoutTransactionsInput = {
    update: XOR<LoanAccountUpdateWithoutTransactionsInput, LoanAccountUncheckedUpdateWithoutTransactionsInput>
    create: XOR<LoanAccountCreateWithoutTransactionsInput, LoanAccountUncheckedCreateWithoutTransactionsInput>
    where?: LoanAccountWhereInput
  }

  export type LoanAccountUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: LoanAccountWhereInput
    data: XOR<LoanAccountUpdateWithoutTransactionsInput, LoanAccountUncheckedUpdateWithoutTransactionsInput>
  }

  export type LoanAccountUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutLoan_accountsNestedInput
    customer?: CustomerUpdateOneRequiredWithoutLoan_accountsNestedInput
    product?: ProductUpdateOneRequiredWithoutLoan_accountsNestedInput
  }

  export type LoanAccountUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    marketing_id?: StringFieldUpdateOperationsInput | string
    customer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutTransactions_processedInput = {
    update: XOR<UserUpdateWithoutTransactions_processedInput, UserUncheckedUpdateWithoutTransactions_processedInput>
    create: XOR<UserCreateWithoutTransactions_processedInput, UserUncheckedCreateWithoutTransactions_processedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactions_processedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactions_processedInput, UserUncheckedUpdateWithoutTransactions_processedInput>
  }

  export type UserUpdateWithoutTransactions_processedInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customers?: CustomerUpdateManyWithoutUserNestedInput
    products?: ProductUpdateManyWithoutUserNestedInput
    capital_ledgers?: CapitalLedgerUpdateManyWithoutUserNestedInput
    loan_accounts?: LoanAccountUpdateManyWithoutUserNestedInput
    transactions_approved?: TransactionUpdateManyWithoutApprovedNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactions_processedInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customers?: CustomerUncheckedUpdateManyWithoutUserNestedInput
    products?: ProductUncheckedUpdateManyWithoutUserNestedInput
    capital_ledgers?: CapitalLedgerUncheckedUpdateManyWithoutUserNestedInput
    loan_accounts?: LoanAccountUncheckedUpdateManyWithoutUserNestedInput
    transactions_approved?: TransactionUncheckedUpdateManyWithoutApprovedNestedInput
  }

  export type UserUpsertWithoutTransactions_approvedInput = {
    update: XOR<UserUpdateWithoutTransactions_approvedInput, UserUncheckedUpdateWithoutTransactions_approvedInput>
    create: XOR<UserCreateWithoutTransactions_approvedInput, UserUncheckedCreateWithoutTransactions_approvedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactions_approvedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactions_approvedInput, UserUncheckedUpdateWithoutTransactions_approvedInput>
  }

  export type UserUpdateWithoutTransactions_approvedInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customers?: CustomerUpdateManyWithoutUserNestedInput
    products?: ProductUpdateManyWithoutUserNestedInput
    capital_ledgers?: CapitalLedgerUpdateManyWithoutUserNestedInput
    loan_accounts?: LoanAccountUpdateManyWithoutUserNestedInput
    transactions_processed?: TransactionUpdateManyWithoutProcessedNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactions_approvedInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customers?: CustomerUncheckedUpdateManyWithoutUserNestedInput
    products?: ProductUncheckedUpdateManyWithoutUserNestedInput
    capital_ledgers?: CapitalLedgerUncheckedUpdateManyWithoutUserNestedInput
    loan_accounts?: LoanAccountUncheckedUpdateManyWithoutUserNestedInput
    transactions_processed?: TransactionUncheckedUpdateManyWithoutProcessedNestedInput
  }

  export type CustomerCreateManyUserInput = {
    id?: string
    full_name: string
    phone_number?: string | null
    address?: string | null
    regency?: string | null
    province?: string | null
    zip_code?: string | null
    job?: string | null
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type ProductCreateManyUserInput = {
    id?: string
    product_name: string
    slug?: string | null
    description: string
    price: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type CapitalLedgerCreateManyUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type?: $Enums.TypeCapitalLedger
    description: string
    refrence_number?: string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type LoanAccountCreateManyUserInput = {
    id?: string
    no_rekening: string
    customer_id: string
    product_id: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type TransactionCreateManyProcessedInput = {
    id?: string
    invoice_number: string
    loan_account_id: string
    approved_by_id: string
    amount_paid: Decimal | DecimalJsLike | number | string
    principal_cut: Decimal | DecimalJsLike | number | string
    interest_cut: Decimal | DecimalJsLike | number | string
    remaining_principal: Decimal | DecimalJsLike | number | string
    remaining_interest: Decimal | DecimalJsLike | number | string
    payment_method?: string
    payment_attachment?: string | null
    payment_status?: $Enums.StatusTransaction
    paid_date: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type TransactionCreateManyApprovedInput = {
    id?: string
    invoice_number: string
    loan_account_id: string
    processed_by_id: string
    amount_paid: Decimal | DecimalJsLike | number | string
    principal_cut: Decimal | DecimalJsLike | number | string
    interest_cut: Decimal | DecimalJsLike | number | string
    remaining_principal: Decimal | DecimalJsLike | number | string
    remaining_interest: Decimal | DecimalJsLike | number | string
    payment_method?: string
    payment_attachment?: string | null
    payment_status?: $Enums.StatusTransaction
    paid_date: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type CustomerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    job?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loan_accounts?: LoanAccountUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    job?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loan_accounts?: LoanAccountUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    regency?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableStringFieldUpdateOperationsInput | string | null
    job?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loan_accounts?: LoanAccountUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loan_accounts?: LoanAccountUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CapitalLedgerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTypeCapitalLedgerFieldUpdateOperationsInput | $Enums.TypeCapitalLedger
    description?: StringFieldUpdateOperationsInput | string
    refrence_number?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CapitalLedgerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTypeCapitalLedgerFieldUpdateOperationsInput | $Enums.TypeCapitalLedger
    description?: StringFieldUpdateOperationsInput | string
    refrence_number?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CapitalLedgerUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumTypeCapitalLedgerFieldUpdateOperationsInput | $Enums.TypeCapitalLedger
    description?: StringFieldUpdateOperationsInput | string
    refrence_number?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LoanAccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUpdateManyWithoutLoan_accountNestedInput
    customer?: CustomerUpdateOneRequiredWithoutLoan_accountsNestedInput
    product?: ProductUpdateOneRequiredWithoutLoan_accountsNestedInput
  }

  export type LoanAccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    customer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutLoan_accountNestedInput
  }

  export type LoanAccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    customer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUpdateWithoutProcessedInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loan_account?: LoanAccountUpdateOneRequiredWithoutTransactionsNestedInput
    approved?: UserUpdateOneRequiredWithoutTransactions_approvedNestedInput
  }

  export type TransactionUncheckedUpdateWithoutProcessedInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    loan_account_id?: StringFieldUpdateOperationsInput | string
    approved_by_id?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUncheckedUpdateManyWithoutProcessedInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    loan_account_id?: StringFieldUpdateOperationsInput | string
    approved_by_id?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUpdateWithoutApprovedInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loan_account?: LoanAccountUpdateOneRequiredWithoutTransactionsNestedInput
    processed?: UserUpdateOneRequiredWithoutTransactions_processedNestedInput
  }

  export type TransactionUncheckedUpdateWithoutApprovedInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    loan_account_id?: StringFieldUpdateOperationsInput | string
    processed_by_id?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUncheckedUpdateManyWithoutApprovedInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    loan_account_id?: StringFieldUpdateOperationsInput | string
    processed_by_id?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LoanAccountCreateManyCustomerInput = {
    id?: string
    no_rekening: string
    marketing_id: string
    product_id: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type LoanAccountUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUpdateManyWithoutLoan_accountNestedInput
    user?: UserUpdateOneRequiredWithoutLoan_accountsNestedInput
    product?: ProductUpdateOneRequiredWithoutLoan_accountsNestedInput
  }

  export type LoanAccountUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    marketing_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutLoan_accountNestedInput
  }

  export type LoanAccountUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    marketing_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LoanAccountCreateManyProductInput = {
    id?: string
    no_rekening: string
    marketing_id: string
    customer_id: string
    principal_amount: Decimal | DecimalJsLike | number | string
    rate_percent: Decimal | DecimalJsLike | number | string
    rate_amount: Decimal | DecimalJsLike | number | string
    start_date: Date | string
    period_start: Date | string
    current_debt_principal: Decimal | DecimalJsLike | number | string
    current_debt_interest: Decimal | DecimalJsLike | number | string
    status?: $Enums.StatusLoan
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type LoanAccountUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUpdateManyWithoutLoan_accountNestedInput
    user?: UserUpdateOneRequiredWithoutLoan_accountsNestedInput
    customer?: CustomerUpdateOneRequiredWithoutLoan_accountsNestedInput
  }

  export type LoanAccountUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    marketing_id?: StringFieldUpdateOperationsInput | string
    customer_id?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutLoan_accountNestedInput
  }

  export type LoanAccountUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    no_rekening?: StringFieldUpdateOperationsInput | string
    marketing_id?: StringFieldUpdateOperationsInput | string
    customer_id?: StringFieldUpdateOperationsInput | string
    principal_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_percent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rate_amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    period_start?: DateTimeFieldUpdateOperationsInput | Date | string
    current_debt_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    current_debt_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumStatusLoanFieldUpdateOperationsInput | $Enums.StatusLoan
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionCreateManyLoan_accountInput = {
    id?: string
    invoice_number: string
    processed_by_id: string
    approved_by_id: string
    amount_paid: Decimal | DecimalJsLike | number | string
    principal_cut: Decimal | DecimalJsLike | number | string
    interest_cut: Decimal | DecimalJsLike | number | string
    remaining_principal: Decimal | DecimalJsLike | number | string
    remaining_interest: Decimal | DecimalJsLike | number | string
    payment_method?: string
    payment_attachment?: string | null
    payment_status?: $Enums.StatusTransaction
    paid_date: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type TransactionUpdateWithoutLoan_accountInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processed?: UserUpdateOneRequiredWithoutTransactions_processedNestedInput
    approved?: UserUpdateOneRequiredWithoutTransactions_approvedNestedInput
  }

  export type TransactionUncheckedUpdateWithoutLoan_accountInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    processed_by_id?: StringFieldUpdateOperationsInput | string
    approved_by_id?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUncheckedUpdateManyWithoutLoan_accountInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoice_number?: StringFieldUpdateOperationsInput | string
    processed_by_id?: StringFieldUpdateOperationsInput | string
    approved_by_id?: StringFieldUpdateOperationsInput | string
    amount_paid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    principal_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interest_cut?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_principal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remaining_interest?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_method?: StringFieldUpdateOperationsInput | string
    payment_attachment?: NullableStringFieldUpdateOperationsInput | string | null
    payment_status?: EnumStatusTransactionFieldUpdateOperationsInput | $Enums.StatusTransaction
    paid_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}