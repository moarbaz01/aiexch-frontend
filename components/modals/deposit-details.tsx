"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, QrCode } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Label } from "../ui/label";

export function DepositDetails({
  method,
  amount,
  onAmountChange,
  onNext,
}: {
  method: any;
  amount: string;
  onAmountChange: (amount: string) => void;
  onNext: () => void;
}) {
  const methodName = method?.name || "";
  const qrCode = method?.qrCode;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Deposit {methodName}
        </h3>
      </div>

      {qrCode && (
        <Card className="p-4">
          <div className="text-center mb-4">
            {qrCode.qrCodeUrl ? (
              <Image
                src={qrCode.qrCodeUrl}
                alt="QR Code"
                height={256}
                width={256}
                className="w-64 h-64 mx-auto mb-3 rounded-lg"
                loading="eager"
              />
            ) : (
              <div className="w-64 h-64 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center">
                <QrCode className="w-56 h-56 text-black" />
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Scan QR code or copy address below
            </p>
          </div>

          {qrCode.walletAddress && (
            <Card className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-mono text-sm break-all">
                  {qrCode.walletAddress}
                </span>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(qrCode.walletAddress);
                    toast.success("Address copied to clipboard!");
                  }}
                  className="ml-2 p-2 text-primary hover:text-primary/80"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </Card>
          )}

          {qrCode.instructions && (
            <Card className="mt-4 p-3 bg-primary/5">
              <p className="text-xs text-muted-foreground">
                {qrCode.instructions}
              </p>
            </Card>
          )}

          <div className="mt-4 space-y-2">
            <Label>Enter Amount</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
            />
            <div className="flex gap-2">
              {[100, 500, 1000, 5000, 10000].map((preset) => (
                <Button
                  key={preset}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onAmountChange(preset.toString())}
                  className="flex-1"
                >
                  ₹{preset}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      )}

      <Button onClick={onNext} disabled={!amount} className="w-full">
        Confirm Deposit
      </Button>
    </div>
  );
}
