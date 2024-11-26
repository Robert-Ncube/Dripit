import React from "react";
import Hero from "@/assets/clothes.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Orders from "@/components/shopping/Orders";
import Address from "@/components/shopping/Address";

const Account = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={Hero}
          alt="account"
          height={"1600"}
          width={"300"}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        className="container mx-auto grid grid-cols-1 gap-8 py-8
      "
      >
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm shadow-black">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
