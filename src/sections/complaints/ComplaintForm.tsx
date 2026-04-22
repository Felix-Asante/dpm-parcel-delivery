import {
  addToast,
  Button,
  Card,
  CardBody,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
  ToastProvider,
} from "@heroui/react";
import { useCallback, useEffect, useId, useState } from "react";
import {
  categoryRequiresPhoto,
  COMPLAINT_CATEGORY_OPTIONS,
  type ComplaintCategoryValue,
} from "../../constants/complaints";
import { submitComplaint } from "../../lib/submit-complaint";
import { getErrorMessage } from "../../utils/error";
import { complaintFieldSchema, type ComplaintFieldInput } from "../../validations";

const ACCEPT_IMAGES = "image/jpeg,image/png,image/gif,.jpg,.jpeg,.png,.gif";

type FieldErrorKey = keyof ComplaintFieldInput | "picture";

export function ComplaintForm() {
  const [submitted, setSubmitted] = useState(false);
  const [resultId, setResultId] = useState<string | null>(null);
  const [lastTrackingForSuccess, setLastTrackingForSuccess] = useState<
    string | null
  >(null);
  const [pending, setPending] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [category, setCategory] = useState<ComplaintCategoryValue | "">("");
  const [issue, setIssue] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldErrorKey, string>>>(
    {}
  );
  const fileInputId = useId();

  const needsPhoto = category ? categoryRequiresPhoto(category) : false;

  useEffect(() => {
    const sp = new URLSearchParams(globalThis.location.search);
    const t = (sp.get("tracking") || sp.get("reference") || "").trim();
    if (t) {
      setTrackingNumber(t);
    }
  }, []);

  useEffect(() => {
    if (!picture) {
      setPicturePreview(null);
      return;
    }
    const url = URL.createObjectURL(picture);
    setPicturePreview(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [picture]);

  const clearPicture = useCallback(() => {
    setPicture(null);
    setFieldErrors((e) => {
      const next = { ...e };
      delete next.picture;
      return next;
    });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFieldErrors({});

    const buildFormData = () => {
      const fd = new FormData();
      fd.append("fullName", fullName);
      fd.append("phone", phone);
      fd.append("trackingNumber", trackingNumber);
      fd.append("category", category);
      fd.append("issue", issue);
      if (picture) {
        fd.append("picture", picture);
      }
      return fd;
    };

    const schemaCheck = complaintFieldSchema.safeParse({
      fullName,
      phone,
      trackingNumber,
      category,
      issue,
    } as {
      fullName: string;
      phone: string;
      trackingNumber: string;
      issue: string;
      category: ComplaintFieldInput["category"] | "";
    });

    if (!schemaCheck.success) {
      const flat = schemaCheck.error.flatten().fieldErrors;
      setFieldErrors({
        fullName: flat.fullName?.[0],
        phone: flat.phone?.[0],
        trackingNumber: flat.trackingNumber?.[0],
        category: flat.category?.[0],
        issue: flat.issue?.[0],
      });
      if (category && needsPhoto && !picture) {
        setFieldErrors((prev) => ({
          ...prev,
          picture:
            "A clear photo is required for this type of issue (JPG, PNG, or GIF).",
        }));
      }
      return;
    }

    if (needsPhoto && !picture) {
      setFieldErrors({
        picture:
          "A clear photo is required for this type of issue (JPG, PNG, or GIF).",
      });
      return;
    }

    setPending(true);
    try {
      const res = await submitComplaint(buildFormData());
      if ("error" in res && res.error) {
        addToast({
          title: "Could not send complaint",
          description: res.error,
          color: "danger",
        });
        return;
      }
      const id =
        res &&
        "result" in res &&
        res.result &&
        typeof res.result === "object" &&
        res.result !== null &&
        "id" in res.result
          ? String((res.result as { id: string }).id)
          : null;
      setLastTrackingForSuccess(trackingNumber.trim() || null);
      setResultId(id);
      setSubmitted(true);
      setFullName("");
      setPhone("");
      setTrackingNumber("");
      setCategory("");
      setIssue("");
      setPicture(null);
    } catch (err) {
      addToast({
        title: "Could not send complaint",
        description: getErrorMessage(err),
        color: "danger",
      });
    } finally {
      setPending(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border border-white/20 shadow-lg bg-gradient-to-b from-white to-neutral-100/30">
          <CardBody className="p-8 md:p-10 gap-4">
            <h2 className="text-2xl font-bold text-secondary">
              Thank you — we have received your complaint
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Our support team will review your case
              {lastTrackingForSuccess
                ? ` for order ${lastTrackingForSuccess}`
                : ""}
              {resultId ? ` (complaint ID: ${resultId})` : ""} and contact you on
              the phone number you gave us, usually within one to two business
              days. If it is urgent, call us and mention your order number and
              complaint ID.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                as="a"
                color="primary"
                radius="sm"
                href="tel:+233554436269"
                variant="flat"
              >
                Call +233 55 443 6269
              </Button>
              <Button
                color="default"
                radius="sm"
                variant="bordered"
                onPress={() => {
                  setSubmitted(false);
                  setResultId(null);
                  setLastTrackingForSuccess(null);
                }}
              >
                Submit another complaint
              </Button>
            </div>
          </CardBody>
        </Card>
        <ToastProvider placement="top-center" />
      </div>
    );
  }

  return (
    <Form
      className="w-full"
      validationBehavior="aria"
      onSubmit={onSubmit}
    >
      <div className="max-w-2xl mx-auto w-full">
        <Card className="border border-white/20 shadow-md bg-gradient-to-b from-white to-neutral-100/30">
          <CardBody className="p-6 md:p-8 flex flex-col gap-6">
            <div className="grid gap-4">
              <Input
                isRequired
                errorMessage={fieldErrors.fullName}
                isInvalid={!!fieldErrors.fullName}
                label="Your full name"
                labelPlacement="outside"
                name="fullName"
                onValueChange={(v) => {
                  setFullName(v);
                  if (fieldErrors.fullName) {
                    setFieldErrors((er) => {
                      const n = { ...er };
                      delete n.fullName;
                      return n;
                    });
                  }
                }}
                placeholder="e.g. Yaa Asantewa Menkah"
                radius="sm"
                size="lg"
                value={fullName}
                variant="bordered"
              />
              <Input
                isRequired
                errorMessage={fieldErrors.phone}
                isInvalid={!!fieldErrors.phone}
                label="Phone number"
                labelPlacement="outside"
                name="phone"
                description="Ghana: 0XXXXXXXXX (e.g. 0244 123 456). International: include country code with +"
                onValueChange={(v) => {
                  setPhone(v);
                  if (fieldErrors.phone) {
                    setFieldErrors((er) => {
                      const n = { ...er };
                      delete n.phone;
                      return n;
                    });
                  }
                }}
                placeholder="e.g. 0244 123 456 or +233 24 123 4567"
                radius="sm"
                size="lg"
                type="tel"
                inputMode="tel"
                value={phone}
                variant="bordered"
              />
              <Input
                isRequired
                errorMessage={fieldErrors.trackingNumber}
                isInvalid={!!fieldErrors.trackingNumber}
                label="Order or tracking number"
                labelPlacement="outside"
                name="trackingNumber"
                onValueChange={(v) => {
                  setTrackingNumber(v);
                  if (fieldErrors.trackingNumber) {
                    setFieldErrors((er) => {
                      const n = { ...er };
                      delete n.trackingNumber;
                      return n;
                    });
                  }
                }}
                placeholder="The reference from your booking or receipt"
                description="This must match an existing delivery in our system."
                radius="sm"
                size="lg"
                value={trackingNumber}
                variant="bordered"
              />

              <Select
                isRequired
                classNames={{
                  value: "text-left whitespace-normal",
                }}
                errorMessage={fieldErrors.category}
                isInvalid={!!fieldErrors.category}
                items={COMPLAINT_CATEGORY_OPTIONS}
                label="What went wrong?"
                labelPlacement="outside"
                name="category"
                placeholder="Choose the option that best describes your issue"
                popoverProps={{
                  placement: "bottom",
                  classNames: {
                    content: "w-[var(--trigger-width)] min-w-[var(--trigger-width)] max-w-[min(100vw-1.5rem,32rem)] z-[1000]",
                  },
                }}
                selectedKeys={category ? new Set([category]) : new Set()}
                onSelectionChange={(keys) => {
                  if (keys === "all") {
                    return;
                  }
                  if (!(keys instanceof Set) || keys.size === 0) {
                    setCategory("");
                    return;
                  }
                  const s = String([...keys][0] ?? "");
                  setCategory((s as ComplaintCategoryValue) || "");
                  if (fieldErrors.category) {
                    setFieldErrors((er) => {
                      const n = { ...er };
                      delete n.category;
                      return n;
                    });
                  }
                  if (s && !categoryRequiresPhoto(s)) {
                    clearPicture();
                  }
                }}
                radius="sm"
                size="lg"
                variant="bordered"
              >
                {(opt) => (
                  <SelectItem
                    key={opt.value}
                    classNames={{ title: "whitespace-normal" }}
                    description={opt.hint}
                    textValue={opt.label}
                  >
                    {opt.label}
                  </SelectItem>
                )}
              </Select>
            </div>

            {needsPhoto && (
              <div
                className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4"
              >
                <p className="text-sm font-semibold text-secondary mb-1">
                  Photo required for this issue
                </p>
                <p className="text-small text-neutral-600 mb-3">
                  Upload one clear image (JPG, PNG, or GIF, up to 10 MB) showing
                  the problem — for example the damaged item or the wrong package
                  you received.
                </p>
                {picturePreview ? (
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <img
                      src={picturePreview}
                      alt="Uploaded evidence"
                      className="max-h-40 rounded-md object-contain border border-neutral-200"
                    />
                    <Button size="sm" variant="light" onPress={clearPicture}>
                      Remove image
                    </Button>
                  </div>
                ) : (
                  <div>
                    <input
                      accept={ACCEPT_IMAGES}
                      className="sr-only"
                      id={fileInputId}
                      name="picture"
                      onChange={(ev) => {
                        const f = ev.target.files?.[0] ?? null;
                        setPicture(f);
                        setFieldErrors((e) => {
                          const n = { ...e };
                          delete n.picture;
                          return n;
                        });
                      }}
                      type="file"
                    />
                    <label
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm border-2 border-primary/60 text-primary font-medium cursor-pointer hover:bg-primary/10 transition-colors"
                      htmlFor={fileInputId}
                    >
                      Choose a photo
                    </label>
                  </div>
                )}
                {fieldErrors.picture && (
                  <p className="text-danger text-small mt-2" role="alert">
                    {fieldErrors.picture}
                  </p>
                )}
              </div>
            )}

            <Textarea
              isRequired
              errorMessage={fieldErrors.issue}
              isInvalid={!!fieldErrors.issue}
              label="What happened?"
              labelPlacement="outside"
              minRows={5}
              name="issue"
              onValueChange={(v) => {
                setIssue(v);
                if (fieldErrors.issue) {
                  setFieldErrors((er) => {
                    const n = { ...er };
                    delete n.issue;
                    return n;
                  });
                }
              }}
              placeholder="Include dates, who you spoke to, and anything else that helps us fix this quickly."
              value={issue}
              radius="sm"
              size="lg"
              variant="bordered"
            />

            <p className="text-small text-neutral-500 -mt-2">
              By sending this form, you confirm that the information is accurate
              to the best of your knowledge.
            </p>

            <Button
              className="w-full sm:w-auto"
              color="primary"
              isLoading={pending}
              radius="sm"
              size="lg"
              type="submit"
              disableRipple
            >
              Submit complaint
            </Button>
          </CardBody>
        </Card>
      </div>
      <ToastProvider placement="top-center" />
    </Form>
  );
}
