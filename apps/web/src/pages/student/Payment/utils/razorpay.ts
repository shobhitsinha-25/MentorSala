// ======================================================
// RAZORPAY RESPONSE
// ======================================================

export interface RazorpayResponse {
  razorpay_order_id: string;

  razorpay_payment_id: string;

  razorpay_signature: string;
}


// ======================================================
// RAZORPAY OPTIONS
// ======================================================

export interface RazorpayOptions {

  key: string;

  amount: number;

  currency: string;

  name: string;

  description?: string;

  order_id: string;

  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };

  theme?: {
    color?: string;
  };

  handler: (
    response: RazorpayResponse
  ) => void;

  modal?: {
    ondismiss?: () => void;
  };
}


// ======================================================
// RAZORPAY INSTANCE
// ======================================================

export interface RazorpayInstance {

  open: () => void;

  close?: () => void;

}


// ======================================================
// WINDOW RAZORPAY
// ======================================================

declare global {

  interface Window {

    Razorpay: new (
      options: RazorpayOptions
    ) => RazorpayInstance;

  }

}


// ======================================================
// LOAD RAZORPAY CHECKOUT
// ======================================================

export const loadRazorpay = (): Promise<boolean> => {

  return new Promise(
    (resolve) => {

      // ----------------------------------------------
      // ALREADY LOADED
      // ----------------------------------------------

      if (
        typeof window.Razorpay !==
        "undefined"
      ) {

        resolve(true);

        return;
      }


      // ----------------------------------------------
      // CHECK EXISTING SCRIPT
      // ----------------------------------------------

      const existingScript =
        document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        );


      if (existingScript) {

        existingScript.addEventListener(
          "load",
          () => resolve(true)
        );

        existingScript.addEventListener(
          "error",
          () => resolve(false)
        );

        return;
      }


      // ----------------------------------------------
      // CREATE SCRIPT
      // ----------------------------------------------

      const script =
        document.createElement(
          "script"
        );


      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";


      script.async = true;


      // ----------------------------------------------
      // SCRIPT LOADED
      // ----------------------------------------------

      script.onload = () => {

        resolve(
          typeof window.Razorpay !==
          "undefined"
        );

      };


      // ----------------------------------------------
      // SCRIPT FAILED
      // ----------------------------------------------

      script.onerror = () => {

        resolve(false);

      };


      document.body.appendChild(
        script
      );

    }
  );

};