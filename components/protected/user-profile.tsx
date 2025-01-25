"use client";
import {
  ADD_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  UPDATE_USER_INFO,
} from "@/app/api/graphql/mutation";
import { GET_USER_INFO } from "@/app/api/graphql/queries";
import PageTitle from "@/components/protected/admin/page-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/lib/hooks";
import { IUser, IUserAddress } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { Plus } from "lucide-react";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";

export enum UserAddressType {
  Home = "HOME",
  Office = "OFFICE",
  Other = "OTHER",
}

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  isTwoFactorEnabled: boolean;
}

interface AddressFormData {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export const UserProfile = () => {
  const currentUser = useCurrentUser();
  const { data: userData } = useQuery(GET_USER_INFO, {
    variables: { userId: currentUser?.id },
  });

  const user: IUser = userData?.User || {};
  const addresses: IUserAddress[] = useMemo(
    () => user.userAddresses || [],
    [user.userAddresses]
  );

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "+880",
    isTwoFactorEnabled: false,
  });

  const [addressFormData, setAddressFormData] = useState<
    Record<UserAddressType, AddressFormData>
  >({
    [UserAddressType.Home]: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    },
    [UserAddressType.Office]: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    },
    [UserAddressType.Other]: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    },
  });

  const [showOfficeAddress, setShowOfficeAddress] = useState(false);
  const [showOtherAddress, setShowOtherAddress] = useState(false);

  const [updateUserInfo] = useMutation(UPDATE_USER_INFO);
  const [updateUserAddress] = useMutation(UPDATE_USER_ADDRESS);
  const [addUserAddress] = useMutation(ADD_USER_ADDRESS);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "+880",
        isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
      });

      // Initialize addressFormData only when userData changes
      const updatedAddressFormData = { ...addressFormData };
      addresses.forEach((address) => {
        updatedAddressFormData[address.type] = {
          address1: address.address1 || "",
          address2: address.address2 || "",
          city: address.city || "",
          state: address.state || "",
          postcode: address.postcode?.toString() || "",
          country: address.country || "",
        };
      });
      setAddressFormData(updatedAddressFormData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, addresses]);

  const handleEditToggleInfo = () => {
    setIsEditingInfo(!isEditingInfo);
  };

  const handleEditToggleAddresses = () => {
    setIsEditingAddresses(!isEditingAddresses);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (
    addressType: UserAddressType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setAddressFormData((prev) => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [name]: value,
      },
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isTwoFactorEnabled: checked,
    });
  };

  const handleSubmitInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserInfo({
        variables: {
          updateUserId: currentUser?.id,
          ...formData,
        },
      });
      toast.success("User info updated successfully");
      setIsEditingInfo(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error updating user info: ${error.message}`);
      } else {
        toast.error("An unknown error occurred while updating user info");
      }
    }
  };

  const handleSubmitAddresses = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Promise.all(
        Object.entries(addressFormData).map(([type, address]) => {
          const existingAddress = addresses.find((addr) => addr.type === type);
          const formattedAddress = {
            ...address,
            postcode: parseInt(address.postcode, 10),
          };

          if (existingAddress) {
            // Update existing address
            return updateUserAddress({
              variables: {
                updateUserAddressId: existingAddress.id,
                ...formattedAddress,
              },
            });
          } else {
            // Add new address
            return addUserAddress({
              variables: {
                ...formattedAddress,
                userId: currentUser?.id,
                type,
              },
            });
          }
        })
      );
      toast.success("User addresses updated successfully");
      setIsEditingAddresses(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error updating user addresses: ${error.message}`);
      } else {
        toast.error("An unknown error occurred while updating user addresses");
      }
    }
  };

  const renderAddressFields = (addressType: UserAddressType) => {
    const address = addressFormData[addressType];

    return (
      <div className="w-full flex flex-col gap-3 rounded-lg border p-3 shadow-sm">
        <Label className="md:text-md font-medium">{addressType} Address</Label>
        {[
          {
            name: "address1",
            label: "Address 1",
            placeholder: "Enter Address 1",
          },
          {
            name: "address2",
            label: "Address 2",
            placeholder: "Enter Address 2",
          },
          { name: "city", label: "City", placeholder: "Enter City" },
          { name: "state", label: "State", placeholder: "Enter State" },
          {
            name: "postcode",
            label: "Postcode",
            placeholder: "Enter Postcode",
          },
          { name: "country", label: "Country", placeholder: "Enter Country" },
        ].map(({ name, label, placeholder }) => (
          <div key={name} className="flex flex-col gap-1">
            <Label className="md:text-md font-medium">{label}</Label>
            <Input
              type={name}
              name={name}
              value={address[name as keyof AddressFormData] || ""}
              placeholder={placeholder}
              onChange={(e) => handleAddressChange(addressType, e)}
              readOnly={!isEditingAddresses}
              className="text-md bg-accent rounded-md"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div className="flex flex-col w-full gap-2">
          <PageTitle title="Personal Information">
            <div className="flex items-center gap-2">
              {isEditingInfo && (
                <Button
                  type="submit"
                  onClick={handleSubmitInfo}
                  className="w-fit font-bold"
                >
                  Save Changes
                </Button>
              )}
              <Button onClick={handleEditToggleInfo}>
                {isEditingInfo ? "Cancel" : "Edit"}
              </Button>
            </div>
          </PageTitle>

          <form
            onSubmit={handleSubmitInfo}
            className="flex flex-col gap-2 my-4"
          >
            {(["name", "email", "phoneNumber"] as const).map((field) => (
              <div
                key={field}
                className="flex flex-col gap-3 rounded-lg border p-3 shadow-sm"
              >
                <Label className="md:text-md font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  readOnly={!isEditingInfo}
                  className="text-md bg-accent rounded-md"
                />
              </div>
            ))}
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <Label className="md:text-md font-medium">
                Two Factor Authentication
              </Label>
              {isEditingInfo ? (
                <Switch
                  id="two-factor-auth"
                  checked={formData.isTwoFactorEnabled}
                  onCheckedChange={handleSwitchChange}
                />
              ) : (
                <Badge
                  variant={
                    formData.isTwoFactorEnabled ? "default" : "destructive"
                  }
                >
                  {formData.isTwoFactorEnabled ? "ON" : "OFF"}
                </Badge>
              )}
            </div>
          </form>
        </div>
        <div className="flex flex-col w-full gap-2">
          <PageTitle title="My Addresses">
            <div className="flex gap-2 items-center">
              {isEditingAddresses && (
                <Button
                  type="submit"
                  onClick={handleSubmitAddresses}
                  className="w-fit font-bold"
                >
                  Save Address Changes
                </Button>
              )}
              <Button onClick={handleEditToggleAddresses}>
                {isEditingAddresses ? "Cancel" : "Edit"}
              </Button>
            </div>
          </PageTitle>
          <form
            onSubmit={handleSubmitAddresses}
            className="flex flex-col md:flex-row w-full gap-2"
          >
            {renderAddressFields(UserAddressType.Home)}
            {showOfficeAddress && renderAddressFields(UserAddressType.Office)}
            {showOtherAddress && renderAddressFields(UserAddressType.Other)}
            <div className="flex flex-col justify-center items-center gap-2 mt-4">
              {!showOfficeAddress && (
                <Button
                  onClick={() => setShowOfficeAddress(true)}
                  className="flex flex-col w-auto h-auto aspect-square justify-center items-center"
                >
                  <Plus className="w-8 h-8" /> <span> Add Office Address</span>
                </Button>
              )}
              {!showOtherAddress && (
                <Button
                  onClick={() => setShowOtherAddress(true)}
                  className="flex flex-col w-auto h-auto aspect-square justify-center items-center"
                >
                  <Plus className="w-8 h-8" /> <span> Add Other Address</span>
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
};
